const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const propertyOwnerController = require('../controllers/property-owner-controller');

router.post('/register-property-owner', propertyOwnerController.registerPropertyOwner);
router.post('/login-property-owner', propertyOwnerController.loginPropertyOwner);
router.route('/add-property').post(upload.array('images', 5), propertyOwnerController.addProperty);
router.route('/get-property-owner/:id').get(propertyOwnerController.getPropertyOwner);

module.exports = router;