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
}

module.exports = new BookingController();