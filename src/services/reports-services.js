const {Bookings, Property} = require('../models');
const {Op} = require("sequelize");

class ReportsServices{
    async getReservationCountsForEachWeekForLastFourWeeks(owner){
        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const lastTwoWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
        const lastThreeWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21);
        const lastFourWeeks = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28);

        const lastWeekBookings = await Bookings.findAll({
            where: {
                bookedDate: {
                    [Op.gte]: lastWeek,
                    [Op.lte]: today
                }
            }
        });

        const lastTwoWeeksBookings = await Bookings.findAll({
            where: {
                bookedDate: {
                    [Op.gte]: lastTwoWeeks,
                    [Op.lte]: lastWeek
                }
            }
        });

        const lastThreeWeeksBookings = await Bookings.findAll({
            where: {
                bookedDate: {
                    [Op.gte]: lastThreeWeeks,
                    [Op.lte]: lastTwoWeeks
                }
            }
        });

        const lastFourWeeksBookings = await Bookings.findAll({
            where: {
                bookedDate: {
                    [Op.gte]: lastFourWeeks,
                    [Op.lte]: lastThreeWeeks
                }
            }
        });

        const distinctPropertiesForOwner = await Property.findAll({
            where: {
                propertyOwnerId: owner
            },
            distinct: 'propertyCode'
        });


        const lastWeekCount = lastWeekBookings.filter(booking => distinctPropertiesForOwner.some(property => property.propertyCode === booking.propertyCode)).length;
        const lastTwoWeeksCount = lastTwoWeeksBookings.filter(booking => distinctPropertiesForOwner.some(property => property.propertyCode === booking.propertyCode)).length;
        const lastThreeWeeksCount = lastThreeWeeksBookings.filter(booking => distinctPropertiesForOwner.some(property => property.propertyCode === booking.propertyCode)).length;
        const lastFourWeeksCount = lastFourWeeksBookings.filter(booking => distinctPropertiesForOwner.some(property => property.propertyCode === booking.propertyCode)).length;

        return {
            lastWeek: lastWeekCount,
            lastTwoWeeks: lastTwoWeeksCount,
            lastThreeWeeks: lastThreeWeeksCount,
            lastFourWeeks: lastFourWeeksCount
        }
    }

    async getPropertyCountsGroupedByTypeForEachCategory(owner){
        const properties = await Property.findAll({
            where: {
                id: owner
            }
        });

        const propertyCounts = {
            apartments: 0,
            boutiques: 0,
            hotel: 0,
        }

        properties.forEach(property => {
            switch (property.type){
                case 'apartment':
                    propertyCounts.apartments++;
                    break;
                case 'boutique':
                    propertyCounts.boutiques++;
                    break;
                case 'hotel':
                    propertyCounts.hotel++;
                    break;
            }
        });

        return propertyCounts;
    }

    async getRevenueGeneratedForEachPropertyTypeForLast30Days(owner){
        const today = new Date();
        const last30Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

        const bookingsAll = await Bookings.findAll({
            where: {
                bookedDate: {
                    [Op.gte]: last30Days,
                    [Op.lte]: today
                }
            }
        });

        let bookings = [];

        for (const booking1 of bookingsAll) {
            const property = await Property.findOne({
                where: {
                    propertyCode: booking1.propertyCode
                }
            });

            if(parseInt(property.propertyOwnerId) === parseInt(owner)){
                bookings.push(booking1);
            }
        }

        const revenue = {
            apartments: 0,
            boutiques: 0,
            hotel: 0,
        }

        for (const booking of bookings) {
            const property = await Property.findOne({
                where: {
                    propertyCode: booking.propertyCode
                }
            });

            // calculate number of days between arrival_date and departure_date
            const arrivalDate = new Date(booking.arrival_date);
            const departureDate = new Date(booking.departure_date);
            const timeDifference = departureDate.getTime() - arrivalDate.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            // calculate revenue for booking
            const revenueForBooking = daysDifference * property.price;

            switch (property.type){
                case 'apartments':
                    revenue.apartments += revenueForBooking;
                    break;
                case 'boutiques':
                    revenue.boutiques += revenueForBooking;
                    break;
                case 'hotel':
                    revenue.hotel += revenueForBooking;
                    break;
            }
        }

        return revenue;
    }
}

module.exports = new ReportsServices();