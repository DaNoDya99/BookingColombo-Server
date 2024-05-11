const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property-controller');

router.route('/get-properties/:id').get(propertyController.getProperties)
router.route('/get-property/:id').get(propertyController.getProperty)
router.route('/update-property').put(propertyController.updateProperty)
router.route('/delete-property/:id').delete(propertyController.deleteProperty)
router.route('/get-all-properties').get(propertyController.getAllProperties)

module.exports = router;