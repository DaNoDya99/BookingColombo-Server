const express = require('express');
const travellerRoutes = require('./traveller-routes');

const router = express.Router();

router.use('/travellers', travellerRoutes);

module.exports = router;