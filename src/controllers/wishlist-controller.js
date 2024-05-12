const wishlistServices = require("../services/wishlist-services");

class WishlistController {
    async addToWishlist(req, res) {
        const data = req.body;
        try {
            const property = await wishlistServices.addToWishlist(data);
            res.status(201).json({ status:'success', message: 'Added to wishlist successfully!', data: property });
        }catch (error) {
          res.status(400).json({ message: error.message });
        }
    }

    async getWishlist(req, res) {
        try{
            const id = req.body.params;
            const wishlist = wishlistServices.getWishlist(id);
            return res.status(200).json({status: "success", message: "wishlist found", data: wishlist});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async getWishlistByTravellerID(req, res) {
        try{
            const id = req.params;
            const wishlist = await wishlistServices.getWishlistByTravellerID(id.id);
            return res.status(200).json({status: "success", message: "wishlist found", data: wishlist});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = new WishlistController();
