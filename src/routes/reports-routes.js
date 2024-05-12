const express = require('express');
const router = express.Router();
const ReportsController = require('../controllers/reports-controller');

router.route('/reservation-counts/:owner').get(ReportsController.getReservationCountsForEachWeekForLastFourWeeks);
router.route('/property-counts/:owner').get(ReportsController.getPropertyCountsGroupedByTypeForEachCategory);
router.route('/revenue-generated/:owner').get(ReportsController.getRevenueGeneratedForEachPropertyTypeForLast30Days);

module.exports = router;