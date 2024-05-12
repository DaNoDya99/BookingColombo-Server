const reviewService = require('../services/review-services');

class ReviewController {
    async addReview(req, res) {
        try {
            const data = req.body;
            const createdReview = await reviewService.addReview(data);
            if (!createdReview) {
                return res.status(500).json({ status: "error", message: "An error occurred" });
            }
            return res.status(201).json({ status: "success", message: "Review added successfully", data: createdReview });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getReview(req, res) {
        try {
            const id = req.params.id;
            const properties = await reviewService.getReview(id);
            return res.status(200).json({ status: "success", message: "All reviews", data: properties });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getAllReviews(req, res) {
        try {
            const properties = await reviewService.getReviews();
            return res.status(200).json({ status: "success", message: "All reviews", data: properties });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async deleteReview(req, res) {
        try {
            const id = req.params.id;
            const deletedReview = await reviewService.deleteReview(id);
            if (deletedReview) {
                return res.status(200).json({ status: "success", message: "Review deleted successfully" });
            } else {
                return res.status(500).json({ status: "error", message: "An error occurred" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateReview(req, res) {
        try {
            const data = req.body;
            const updatedReview = await reviewService.updateReview(id, data);
            if (updatedReview) {
                return res.status(200).json({ status: "success", message: "Review updated successfully", data: updatedReview });
            } else {
                return res.status(500).json({ status: "error", message: "An error occurred" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getReviewsByPlace(req, res) {
        try {
            const placeCode = req.params.placeCode;
            const properties = await reviewService.getReviewsByPlace(placeCode);
            return res.status(200).json({ status: "success", message: "All reviews", data: properties });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new ReviewController();