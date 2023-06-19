const bcrypt = require('bcrypt');
const { pool } = require('../config/config');
const { v4: uuidv4 } = require('uuid');

const flightsControllers = {
    searchFlights: async (req, res) => {
        console.log('Searching flights');
        try {
            // Get the search parameters from the request
            const { departureAirport, arrivalAirport } = req.body;

            // Build the search query
            const searchQuery = `
                SELECT flights.*, airline_list.IATA AS airline_iata, airline_list.logo AS airline_logo, aircraft_model.model AS aircraft_model
                FROM flights
                INNER JOIN airline_list ON flights.flight_airline_id = airline_list.id
                INNER JOIN aircraft_model ON flights.aircraft_id = aircraft_model.aircraft_id
                WHERE 
                departure_airport = $1
                AND arrival_airport = $2
            `;

            // Set the search values
            const searchValues = [departureAirport, arrivalAirport];

            // Execute the search query
            const searchResult = await pool.query(searchQuery, searchValues);

            // Retrieve the flights from the search result
            const flights = searchResult.rows;

            const rowCount = searchResult.rowCount;

            res.json({ rowCount, flights });
        } catch (error) {
            console.error('Error searching flights', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    addBookings: async (req, res) => {
        console.log('addBookings');
        try {
            const {
                user_id,
                flight_id,
                seats_booked,
                seat_numbers
            } = req.body;
            // Check if the user exists
            const userQuery = 'SELECT email FROM users WHERE user_id = $1';
            const userValues = [user_id];
            const userResult = await pool.query(userQuery, userValues);

            if (userResult.rowCount === 0) {
                console.log('Invalid user ID');
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            const userEmail = userResult.rows[0].email;
            console.log('User email:', userEmail);

            // Check if the flight exists
            const flightQuery = 'SELECT * FROM flights WHERE flight_id = $1';
            const flightValues = [flight_id];
            const flightResult = await pool.query(flightQuery, flightValues);
    
            if (flightResult.rowCount === 0) {
                return res.status(400).json({ message: 'Invalid flight ID' });
            }
            // Check if the seats_booked value is valid
            if (seats_booked <= 0) {
                return res.status(400).json({ message: 'Invalid number of seats booked' });
            }   
            // Get the aircraft ID for the given flight
            const aircraftIdQuery = 'SELECT aircraft_id FROM flights WHERE flight_id = $1';
            const aircraftIdValues = [flight_id];
            const aircraftIdResult = await pool.query(aircraftIdQuery, aircraftIdValues);

            if (aircraftIdResult.rowCount === 0) {
                return res.status(400).json({ message: 'Invalid flight ID' });
            }

            const aircraftId = aircraftIdResult.rows[0].aircraft_id;

            // Get the aircraft capacity for the given aircraft ID
            const aircraftQuery = 'SELECT capacity FROM Aircraft_model WHERE aircraft_id = $1';
            const aircraftValues = [aircraftId];
            const aircraftResult = await pool.query(aircraftQuery, aircraftValues);

            if (aircraftResult.rowCount === 0) {
                return res.status(400).json({ message: 'Invalid aircraft ID' });
            }

            const aircraftCapacity = aircraftResult.rows[0].capacity;

            // Check if the seats_booked value exceeds the aircraft capacity
            if (seats_booked > aircraftCapacity) {
                return res.status(400).json({ message: 'Number of seats booked exceeds the aircraft capacity' });
            }
            // Get the current number of seats booked for the flight
            const currentSeatsBookedQuery = 'SELECT seats_booked FROM flights WHERE flight_id = $1';
            const currentSeatsBookedValues = [flight_id];
            const currentSeatsBookedResult = await pool.query(currentSeatsBookedQuery, currentSeatsBookedValues);

            if (currentSeatsBookedResult.rowCount === 0) {
                return res.status(400).json({ message: 'Invalid flight ID' });
            }

            const currentSeatsBooked = currentSeatsBookedResult.rows[0].seats_booked;

            // Calculate the total number of seats booked after the new booking
            const totalSeatsBooked = currentSeatsBooked + seats_booked;

            // Check if the total number of booked seats exceeds the aircraft capacity
            if (totalSeatsBooked > aircraftCapacity) {
                const seatsLeft = aircraftCapacity - currentSeatsBooked;
                return res.status(400).json({ message: `The flight is fully booked. There are only ${seatsLeft} seats left.` });
            }

            // Check if the number of seat numbers matches the number of seats booked
            console.log('Seats booked:', seats_booked);
            console.log('Seat numbers:', seat_numbers);
            console.log('Number of seat numbers:', seat_numbers.length);
            // Check if the number of seat numbers matches the number of seats booked
            if (seat_numbers.length !== seats_booked) {
                return res.status(400).json({ message: 'Number of seat numbers does not match the number of seats booked' });
            }
            
            // Check if the seat numbers are already booked for the same flight
            const seatQuery = 'SELECT * FROM booking WHERE flight_id = $1 AND seat_numbers && $2';
            const seatValues = [flight_id, seat_numbers];
            const seatResult = await pool.query(seatQuery, seatValues);
    
            if (seatResult.rowCount > 0) {
                console.log('Some or all of the seat numbers are already booked for the same flight');
                return res.status(400).json({ message: 'Some or all of the seat numbers are already booked for the same flight' });
            }
    
            // Insert the new bookings into the booking table
            const insertBookingQuery = `
                INSERT INTO booking (
                    user_id,
                    flight_id,
                    seats_booked,
                    seat_numbers,
                    status
                )
                VALUES ($1, $2, $3, $4, 'Unpaid')
                RETURNING booking_id
            `;

            const insertBookingValues = [
                user_id,
                flight_id,
                seats_booked,
                seat_numbers
            ];
    
            const insertedBooking = await pool.query(insertBookingQuery, insertBookingValues);
    
            const bookingId = insertedBooking.rows[0].booking_id;
    
            // Update the seats_booked value in the flights table
            const updateFlightQuery = 'UPDATE flights SET seats_booked = seats_booked + $1 WHERE flight_id = $2';
            const updateFlightValues = [seats_booked, flight_id];
            await pool.query(updateFlightQuery, updateFlightValues);
    
            console.log('Booking added successfully:');
            console.log(req.body);
    
            res.status(201).json({ message: 'Booking added successfully', booking_id: bookingId });
        } catch (error) {
            console.error('Error adding bookings', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    payBooking: async (req, res) => {
        try {
            const bookingId = req.params.bookingId;
        
            const updateQuery = `
                UPDATE bookings
                SET status = 'booked'
                WHERE booking_id = $1
            `;
        
            await pool.query(updateQuery, [bookingId]);
        
            res.json({ message: 'Booking successfully paid and updated' });
        } catch (error) {
            console.error('Error paying for a booking', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    homeFlights: (req, res) => {
        res.send('Welcome to the Flights homepage');
    },

    getAllFlights: async (req, res) => {
        console.log('Getting all flights');
        try {
        const query = 'SELECT * FROM flights';
        const searchResult = await pool.query(query);
        const flights = searchResult.rows;
        const rowCount = searchResult.rowCount;

        res.json({rowCount, flights});
        } catch (error) {
        console.error('Error getting all flights', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllAirports: async (req, res) => {
        console.log('Getting all airports');
        try {
        const query = 'SELECT * FROM airports';
        const searchResult = await pool.query(query);
        const airports = searchResult.rows;
        const rowCount = searchResult.rowCount;

        res.json({rowCount, airports});
        } catch (error) {
        console.error('Error getting all airports', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },

    searchAirports: async (req, res) => {
        console.log('Searching for airports');
        try {
            const search = req.body.search;
        
            const searchQuery = `
                SELECT *
                FROM airports
                WHERE 
                code ILIKE $1
                OR name ILIKE $1
                OR cityCode ILIKE $1
                OR cityName ILIKE $1
                OR countryName ILIKE $1
                OR country ILIKE $1
            `;
        
            const searchValues = [`%${search}%`];
            const searchResult = await pool.query(searchQuery, searchValues);
        
            const airports = searchResult.rows;
            const rowCount = searchResult.rowCount;

            res.json({rowCount,airports});
        } catch (error) {
            console.error('Error searching airports', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    

};

module.exports = flightsControllers;
