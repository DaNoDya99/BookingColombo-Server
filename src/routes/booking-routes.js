const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking-controller');

router.route('/add-booking').post(BookingController.addBooking);

module.exports = router;