const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking-controller');

router.route('/add-booking').post(BookingController.addBooking);
router.route('/get-bookings/:arrival_date').get(BookingController.getBookingsByArrivalDate);
router.route('/delete-bookings/:id').delete(BookingController.deleteBooking);
router.route('/get-all-bookings/:id').get(BookingController.getBookingsByID);

module.exports = router;