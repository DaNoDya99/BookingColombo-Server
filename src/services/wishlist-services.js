const { where } = require("sequelize")
const {Property, Wishlist, Property_image} = require("../models")

class WishlistServices {
    async addToWishlist(data) {
        try{
            return await Wishlist.create({
                propertyCode : data.propertyCode,
                travellerID : data.travellerID
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async getWishlist(id){
        try{
            return Wishlist.findAll()
        } catch (error) {
            throw new Error(error.message)
        }  
    }

    async getWishlistByTravellerID(travellerID){
        try{
            const list = await Wishlist.findAll({where: {travellerID: travellerID}})

            // get traveller details and property details
            for (let i = 0; i < list.length; i++) {
                list[i].dataValues.property = await Property.findOne({where: {propertyCode: list[i].propertyCode}})

            //     get property images
                list[i].dataValues.property.dataValues.images = await Property_image.findAll({where: {propertyCode: list[i].propertyCode}})
            }

            return list
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = new WishlistServices()
