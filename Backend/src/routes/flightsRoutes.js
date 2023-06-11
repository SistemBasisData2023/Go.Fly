const express = require('express');
const router = express.Router();

const flightsControllers = require('../controllers/flightsControllers');

// Route to search for flights
router.get('/search', flightsControllers.searchFlights);

// Route to book a flight
router.post('/booking', flightsControllers.addBookings);

// Route to pay for a booking
router.put('/booking/pay', flightsControllers.payBooking);

// Route to home page
router.get('/', flightsControllers.homeFlights);

// Route to get all flights
router.get('/getAll', flightsControllers.getAllFlights);

// Route to get all airports
router.get('/getAllAirports', flightsControllers.getAllAirports);

// Route to search for airports
router.get('/searchAirports', flightsControllers.searchAirports);


module.exports = router;
