const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const placeController = require('../controllers/place-controller');
const adminController = require('../controllers/admin-controller');

router.route('/add-place').post(upload.array('images', 5), placeController.addPlace);
router.route('/get-place/:id').get(placeController.getPlaces);
router.route('/login').post(adminController.login);

module.exports = router;