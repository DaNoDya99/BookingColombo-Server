const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const placeController = require('../controllers/place-controller');

router.route('/add-place').post(upload.array('images', 5), placeController.addPlace);
router.route('/get-place/:id').get(placeController.getPlaces);

module.exports = router;