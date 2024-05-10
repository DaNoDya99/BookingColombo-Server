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

    
} 

module.exports = new PropertyServices()