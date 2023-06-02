const bcrypt = require('bcrypt');
const { pool } = require('../config/config');
const { v4: uuidv4 } = require('uuid');

const adminController = {
    addFlights: async (req, res) => {
        console.log('addFlights');
        try {
        const {
            flight_airline_id,
            flight_no,
            aircraft_id,
            scheduled_departure,
            scheduled_arrival,
            departure_airport,
            arrival_airport,
            price
        } = req.body;

        // Check if the flight_no is unique for the airline
        const uniqueFlightQuery = 'SELECT * FROM flights WHERE flight_airline_id = $1 AND flight_no = $2';
        const uniqueFlightValues = [flight_airline_id, flight_no];
        const uniqueFlightResult = await pool.query(uniqueFlightQuery, uniqueFlightValues);

        if (uniqueFlightResult.rowCount > 0) {
            return res.status(400).json({ message: 'Flight number is already used for the selected airline' });
        }

        // Check if the flight_airline_id is valid
        const airlineQuery = 'SELECT * FROM airline_list WHERE id = $1';
        const airlineValues = [flight_airline_id];
        const airlineResult = await pool.query(airlineQuery, airlineValues);

        if (airlineResult.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid airline ID' });
        }

        // Check if the aircraft_id is valid
        const aircraftQuery = 'SELECT * FROM aircraft_model WHERE aircraft_id = $1';
        const aircraftValues = [aircraft_id];
        const aircraftResult = await pool.query(aircraftQuery, aircraftValues);

        if (aircraftResult.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid aircraft ID' });
        }

        // Check if the departure_airport is valid
        const departureAirportQuery = 'SELECT * FROM airports WHERE code = $1';
        const departureAirportValues = [departure_airport];
        const departureAirportResult = await pool.query(departureAirportQuery, departureAirportValues);

        if (departureAirportResult.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid departure airport code' });
        }

        // Check if the arrival_airport is valid
        const arrivalAirportQuery = 'SELECT * FROM airports WHERE code = $1';
        const arrivalAirportValues = [arrival_airport];
        const arrivalAirportResult = await pool.query(arrivalAirportQuery, arrivalAirportValues);

        if (arrivalAirportResult.rowCount === 0) {
            return res.status(400).json({ message: 'Invalid arrival airport code' });
        }

        // Insert the new flight into the flights table
        const insertFlightQuery = `
            INSERT INTO flights (
            flight_airline_id,
            flight_no,
            aircraft_id,
            scheduled_departure,
            scheduled_arrival,
            departure_airport,
            arrival_airport,
            status,
            price
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        const insertFlightValues = [
            flight_airline_id,
            flight_no,
            aircraft_id,
            scheduled_departure,
            scheduled_arrival,
            departure_airport,
            arrival_airport,
            'Scheduled', 
            price
        ];
        const insertedFlight = await pool.query(insertFlightQuery, insertFlightValues);

        const addedFlight = insertedFlight.rows[0];

        console.log('Flight added successfully:');
        console.log(req.body);

        res.status(201).json({ message: 'Flight added successfully' });
        } catch (error) {
        console.error('Error adding flights', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },

    editFlights: async (req, res) => {
        console.log('editFlights');
        try {
            const flightId = req.params.flight_id;
            const {
                flight_airline_id,
                flight_no,
                aircraft_id,
                scheduled_departure,
                scheduled_arrival,
                departure_airport,
                arrival_airport,
                price
            } = req.body;
        
            // Check if the flight exists
            const flightQuery = 'SELECT * FROM flights WHERE flight_id = $1';
            const flightValues = [flightId];
            const flightResult = await pool.query(flightQuery, flightValues);
        
            if (flightResult.rowCount === 0) {
                return res.status(404).json({ message: 'Flight not found' });
            }
        
            // Update the flight
            const updateFlightQuery = `
                UPDATE flights
                SET flight_airline_id = $1, flight_no = $2, aircraft_id = $3,
                scheduled_departure = $4, scheduled_arrival = $5,
                departure_airport = $6, arrival_airport = $7, price = $8
                WHERE flight_id = $9
            `;
            const updateFlightValues = [
                flight_airline_id,
                flight_no,
                aircraft_id,
                scheduled_departure,
                scheduled_arrival,
                departure_airport,
                arrival_airport,
                price,
                flightId
            ];
            await pool.query(updateFlightQuery, updateFlightValues);
        
            // Get the airline's IATA code
            const airlineQuery = 'SELECT IATA FROM airline_list WHERE id = $1';
            const airlineValues = [flight_airline_id];
            const airlineResult = await pool.query(airlineQuery, airlineValues);
            const airlineIATA = airlineResult.rows[0].iata;

            res.send(`Flight number ${airlineIATA} ${flight_no} is updated`);
            console.log('Flight update successful:');
            console.log(req.body);
            } catch (error) {
            console.error('Error editing flights', error);
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
                return res.status(400).json({ message: 'Some or all of the seat numbers are already booked for the same flight' });
            }
    
            // Insert the new bookings into the booking table
            const insertBookingQuery = `
                INSERT INTO booking (
                    user_id,
                    flight_id,
                    seats_booked,
                    seat_numbers
                )
                VALUES ($1, $2, $3, $4)
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
    
    editBookings: async (req, res) => {
        try {
            const bookingId = req.params.booking_id;
            const { seats_booked, seat_numbers } = req.body;
    
            // Check if the booking exists
            const bookingQuery = 'SELECT * FROM booking WHERE booking_id = $1';
            const bookingValues = [bookingId];
            const bookingResult = await pool.query(bookingQuery, bookingValues);
    
            if (bookingResult.rowCount === 0) {
                return res.status(404).json({ message: 'Booking not found' });
            }
    
            // Update the booking with the new values
            const updateBookingQuery = `
                UPDATE booking
                SET seats_booked = $1, seat_numbers = $2
                WHERE booking_id = $3
            `;
            const updateBookingValues = [seats_booked, seat_numbers, bookingId];
            await pool.query(updateBookingQuery, updateBookingValues);
    
            console.log(`Booking with ID ${bookingId} updated successfully:`);
            console.log(req.body);
    
            res.status(200).json({ message: 'Booking updated successfully' });
        } catch (error) {
            console.error('Error editing bookings', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    

    addAircraft: async (req, res) => {
        try {
        // Logic to add aircraft
        res.send('Add aircraft');
        } catch (error) {
        console.error('Error adding aircraft', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },

    editAirline: async (req, res) => {
        try {
        const airlineId = req.params.airline_id;
        // Logic to edit airline with the given airlineId
        res.send(`Edit airline with ID ${airlineId}`);
        } catch (error) {
        console.error('Error editing airline', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = adminController;
