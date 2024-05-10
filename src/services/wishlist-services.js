const { where } = require("sequelize")
const {Property, Wishlist} = require("../models")

class WishlistServices {
    async addToWishlist(data) {
        try{
            // const traveller = await Property.findOne({ where : {id : data.id}}).then((traveller) => {
            //     return traveller;
            // }).catch((error) => {
            //     return null
            // });

            // const property = await Property.findOne({ where : {propertyCode : data.propertyCode}}).then((property) => {
            //     return property;
            // }).catch((error) => {
            //     return null
            // })

            return await Wishlist.create({
                propertyCode : data.propertyCode,
                travllerID : data.id
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async getWishlist(id){
        try{
            const wishlist = Wishlist.findAll();
            return wishlist
        } catch (error) {
            throw new Error(error.message)
        }  
    }
}

module.exports = new WishlistServices()
