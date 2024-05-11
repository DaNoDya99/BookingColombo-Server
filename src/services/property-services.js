const { where } = require("sequelize")
const {Property, Property_image} = require("../models")

class PropertyServices {
    async getProperties(id) {
        try{
            const properties = await Property.findAll({where : {propertyOwnerId : id}})
            // console.log(properties);

            if(properties) {
                for(let property in properties) {
                    const images = await Property_image.findAll({
                        where: {
                            propertyCode: properties[property].dataValues.propertyCode
                        }
                    }).then ((images)  => {
                        return images;
                    }).catch ((error) => {
                        return null;
                    });
                    properties[property].dataValues.images = images;
                }
            }
            // console.log(properties[0].dataValues);
            return properties 
        } catch (error) {
            throw new Error(error.message)
        }  
    }

    async getProperty(id) {
        try{
            const property = await Property.findOne({where : {propertyCode : id}})
            property.dataValues.images = await Property_image.findAll({
                where: {
                    propertyCode: property.dataValues.propertyCode
                }
            }).then((images) => {
                return images;
            }).catch((error) => {
                return null;
            });
            return property
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProperty(data) {
        try {
            const property = await Property.findOne({where: {propertyCode: data.propertyCode}})
            if(!property){
                throw new Error("Property not found")
            }
            const updatedProperty = await Property.update({
                type : data.type,
                roomDetails : data.roomDetails,
                price : data.price,
                facilityDetails : data.facilityDetails,
                location : data.location,
            }, {where: {propertyCode: data.propertyCode}})
            return updatedProperty
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProperty(id) {
        try {
            const property = await Property.findOne({where: {propertyCode: id}})
            if(!property){
                throw new Error("Property not found")
            }
            return await Property.destroy({where: {propertyCode: id}})
        } catch (error) {
            throw new Error(error.message)
        }
    }

} 

module.exports = new PropertyServices()