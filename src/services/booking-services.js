const {Bookings} = require('../models');
const {Op} = require("sequelize");

class BookingServices{
    async addBooking(booking){
        try{
            const bookingExists = await Bookings.findAll({
                arrival_date : {
                    [Op.between] : [booking.arrival_date, booking.departure_date]
                },
                departure_date : {
                    [Op.between] : [booking.arrival_date, booking.departure_date]
                },
            })

            if(bookingExists.length > 0){
                throw new Error("Booking already exists");
            }

            return await Bookings.create({
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                arrival_date: booking.arrival_date,
                departure_date: booking.departure_date,
                noOfPeople: booking.noOfPeople,
                propertyCode: booking.propertyCode,
                travellerID: booking.travellerID
            }).then((newBooking) => {
                return newBooking;
            }).catch((error) => {
                throw new Error(error.message);
            });

        }catch (e){
            throw new Error(e.message);
        }
    }

    async getBookingsByArrivalDate(arrival_date){
        try{
            return await Bookings.findAll({
                where : {
                    arrival_date : {
                        [Op.lte] : arrival_date
                    },
                    departure_date : {
                        [Op.gte]: arrival_date
                    }
                },

            }).then((bookings) => {
                return bookings;
            }).catch((error) => {
                throw new Error(error.message);
            });
        }catch (e){
            throw new Error(e.message);
        }
    }
}

module.exports = new BookingServices();