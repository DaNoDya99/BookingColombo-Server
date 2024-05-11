const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property-controller');

router.route('/get-properties/:id').get(propertyController.getProperties)

module.exports = router;