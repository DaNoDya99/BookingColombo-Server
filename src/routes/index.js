const express = require('express');
const travellerRoutes = require('./traveller-routes');
const propertyOwnerRoutes = require('./property-owner-routes');
const propertyRoutes = require('./property-routes');

const router = express.Router();

router.use('/travellers', travellerRoutes);
router.use('/property-owners', propertyOwnerRoutes);
router.use('/property', propertyRoutes);

module.exports = router;