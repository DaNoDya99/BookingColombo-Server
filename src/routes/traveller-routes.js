const express = require('express');
const router = express.Router();

const TravellerController = require('../controllers/traveller-controller');

router.route('/say-hello').get(TravellerController.sayHello);
router.route('/register-traveller').post(TravellerController.registerTraveller);
router.route('/login-traveller').post(TravellerController.loginTraveller);


module.exports = router;