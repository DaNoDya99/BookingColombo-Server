const express = require('express');
const travellerRoutes = require('./traveller-routes');
const propertyOwnerRoutes = require('./property-owner-routes');
const propertyRoutes = require('./property-routes');
const adminRoutes = require('./admin-routes');
const reviewRoutes = require('./review-routes');

const router = express.Router();

router.use('/travellers', travellerRoutes);
router.use('/property-owners', propertyOwnerRoutes);
router.use('/property', propertyRoutes);
router.use('/admin', adminRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;