const express = require('express');
const travellerRoutes = require('./traveller-routes');
const propertyOwnerRoutes = require('./property-owner-routes');

const router = express.Router();

router.use('/travellers', travellerRoutes);
router.use('/property-owners', propertyOwnerRoutes);

module.exports = router;