const reportsService = require('../services/reports-services');

class ReportsController{

    async getReservationCountsForEachWeekForLastFourWeeks(req, res){
        try{
            const owner = req.params.owner;
            const reservationCounts = await reportsService.getReservationCountsForEachWeekForLastFourWeeks(owner);
            res.status(200).json({ status: "success", message: "Reservation counts fetched successfully", data: reservationCounts});
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    async getPropertyCountsGroupedByTypeForEachCategory(req, res){
        try{
            const propertyCounts = await reportsService.getPropertyCountsGroupedByTypeForEachCategory(req.params.owner);
            res.status(200).json({ status: "success", message: "Property counts fetched successfully", data: propertyCounts});
        } catch(e){
            res.status(500).json(e.message);
        }
    }

    async getRevenueGeneratedForEachPropertyTypeForLast30Days(req, res){
        try{
            const owner = req.params.owner;
            const revenueGenerated = await reportsService.getRevenueGeneratedForEachPropertyTypeForLast30Days(owner);
            res.status(200).json({ status: "success", message: "Revenue generated fetched successfully", data: revenueGenerated});
        } catch(e){
            res.status(500).json(e.message);
        }
    }
}

module.exports = new ReportsController();