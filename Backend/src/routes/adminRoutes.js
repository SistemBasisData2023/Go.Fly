const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminControllers');

// Route to add flights
router.post('/addFlights', adminController.addFlights);

// Route to edit flights
router.put('/editFlights/:flight_id', adminController.editFlights);

// Route to add bookings
router.post('/addBookings', adminController.addBookings);

// Route to edit bookings
router.put('/editBookings/:booking_id', adminController.editBookings);

// Route to add aircraft
router.post('/addAircraft', adminController.addAircraft);

// Route to edit airline
router.put('/editAirline/:airline_id', adminController.editAirline);

module.exports = router;
