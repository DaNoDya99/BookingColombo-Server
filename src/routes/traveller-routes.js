const express = require('express');
const router = express.Router();

const TravellerController = require('../controllers/traveller-controller');

router.route('/say-hello').get(TravellerController.sayHello);

module.exports = router;