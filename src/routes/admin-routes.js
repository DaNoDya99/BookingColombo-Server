const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const placeController = require('../controllers/place-controller');
const adminController = require('../controllers/admin-controller');

router.route('/add-place').post(upload.array('images', 5), placeController.addPlace);
router.route('/get-place/:id').get(placeController.getPlaces);
router.route('/get-places').get(placeController.getAllPlaces);
router.route('/login').post(adminController.login);
router.route('/delete-place/:id').delete(placeController.deletePlace);
router.route('/update-place').put(placeController.updatePlace);

module.exports = router;