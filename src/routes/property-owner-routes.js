const express = require('express');
const router = express.Router();
const propertyOwnerController = require('../controllers/property-owner-controller');

router.post('/register-property-owner', propertyOwnerController.registerPropertyOwner);
router.post('/login-property-owner', propertyOwnerController.loginPropertyOwner);

module.exports = router;