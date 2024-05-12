const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');

router.route('/add-review').post(reviewController.addReview);
router.route('/get-review/:id').get(reviewController.getReview);
router.route('/get-reviews').get(reviewController.getAllReviews);
router.route('/delete-review/:id').delete(reviewController.deleteReview);
router.route('/update-review').put(reviewController.updateReview);
router.route('/get-place-reviews/:placeCode').get(reviewController.getReviewsByPlace);

module.exports = router;