const express = require('express');
const router = express.Router();

const TravellerController = require('../controllers/traveller-controller');
const wishlistController = require('../controllers/wishlist-controller');

router.route('/say-hello').get(TravellerController.sayHello);
router.route('/register-traveller').post(TravellerController.registerTraveller);
router.route('/login-traveller').post(TravellerController.loginTraveller);
router.route('/get-traveller/:id').get(TravellerController.getTraveller);
router.post('/add-to-wishlist', wishlistController.addToWishlist);
router.route('/get-wishlist/:id').get(wishlistController.getWishlist);
router.route('/get-wishlist-by-traveller/:id').get(wishlistController.getWishlistByTravellerID);

module.exports = router;