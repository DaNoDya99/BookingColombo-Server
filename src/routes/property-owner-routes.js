const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const propertyOwnerController = require('../controllers/property-owner-controller');

router.post('/register-property-owner', propertyOwnerController.registerPropertyOwner);
router.post('/login-property-owner', propertyOwnerController.loginPropertyOwner);
router.route('/add-property').post(upload.array('images', 5), propertyOwnerController.addProperty);

module.exports = router;