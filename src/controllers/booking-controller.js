const BookingService = require('../services/booking-services');

class BookingController{
    async addBooking(req, res){
        try{
            const booking = req.body;
            const newBooking = await BookingService.addBooking(booking);
            if(newBooking){
                res.status(201).json({ status: "success", message: "Booking Added Successfully"});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred"});
            }
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    async getBookingsByArrivalDate(req, res){
        try{
            const arrival_date = req.params.arrival_date;
            const bookings = await BookingService.getBookingsByArrivalDate(arrival_date);
            if(bookings){
                res.status(200).json({ status: "success", message: "Bookings fetched successfully", bookings: bookings});
            }else{
                res.status(500).json({ status: "success", message: "An error occurred", bookings: []})
            }
        }catch (e){
            res.status(500).json(e.message);
        }
    }
}

module.exports = new BookingController();