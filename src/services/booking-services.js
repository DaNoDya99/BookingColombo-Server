const {Bookings, Property, Property_image} = require('../models');
const {Op, where} = require("sequelize");

class BookingServices{
    async addBooking(booking){
        try{
            const bookingExists = await Bookings.findAll({ where : {
                    [Op.or] : [
                        {
                            arrival_date : {
                                [Op.between] : [booking.arrival_date, booking.departure_date]
                            }
                        },
                        {
                            departure_date : {
                                [Op.between] : [booking.arrival_date, booking.departure_date]
                            }
                        }
                    ]
                }
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

    async deleteBooking(id) {
        try {
            const booking = await Bookings.findOne({
                where: {
                    id: id
                }
            });

            if (!booking) {
                throw new Error("Booking not found");
            }

            await Bookings.destroy({
                where: {
                    id: id
                }
            });

            return booking;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getBookingsByID(id){
        try{
            const bookings = await Bookings.findAll();
            if(bookings) {
                for(let booking in bookings) {
                    const images = await Property_image.findAll({
                        where : {propertyCode: bookings[booking].dataValues.propertyCode}
                    }).then ((images)  => {
                        return images;
                    }).catch ((error) => {
                        return null;
                    });
                    bookings[booking].dataValues.images = images;

                    const properties = await Property.findOne({
                        where: {
                            propertyCode: bookings[booking].dataValues.propertyCode
                        }
                    }).then ((properties)  => {
                        return properties;
                    }).catch ((error) => {
                        return null;
                    });
                    bookings[booking].dataValues.properties = properties;
                }
            }
            return bookings
        }catch (e){
            throw new Error(e.message);
        }
    }
}

module.exports = new BookingServices();