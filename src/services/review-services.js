const {Review, Traveller } = require('../models');
class ReviewServices{
    async addReview(data){
        console.log(data);
        try{
            return await Review.create({
                placeCode: data.placeCode,
                travellerID: data.travellerID,
                review: data.review,
                rating: data.rating
            });
        } catch (error){
            throw new Error(error);
        }
    }

    async getReview(id){
        try{
            return await Review.findOne({where: {id: id}});
        } catch (error){
            throw new Error(error.message);
        }
    }

    async getReviews(){
        try{
            return await Review.findAll();
        } catch (error){
            throw new Error(error.message);
        }
    }

    async deleteReview(id){
        try{
            const review = await Review.findOne({ where: {id: id}});
            if(review){
                await Review.destroy({where: {id: id}});
                return true;
            } else {
                return false;
            }
        } catch (error){
            throw new Error(error.message);
        }
    }

    async updateReview(id, data){
        try{
            const review = await Review.findOne({ where: {id: id}});
            if(review){
                Review.update({
                    placeCode: data.placeCode,
                    travellerID: data.travellerID,
                    review: data.review,
                    rating: data.rating
                }, {where: {id: id}});
                return Review.findOne({ where: {id: id}});
            } else {
                return false;
            }
        } catch (error){
            throw new Error(error.message);
        }
    }

    async getReviewsByPlace(placeCode){
        try{
            const reviews = await Review.findAll({where: {placeCode: placeCode}});

            // get traveller details
            for(let review in reviews){
                reviews[review].dataValues.traveller = await Traveller.findOne({where: {id: reviews[review].dataValues.travellerID}});
            }
            return reviews;
        } catch (error){
            throw new Error(error.message);
        }
    }
}

module.exports = new ReviewServices();