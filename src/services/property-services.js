const { where } = require("sequelize")
const {Property} = require("../models")

class PropertyServices {
    async getProperties(id) {
        try{
            const properties = Property.findAll()

            if(properties) {
                for(let property in properties) {
                    const images = await Property_images.findAll({
                        where: {
                            propertyCode: properties[property].dataValues.propertyCode
                        }
                    }).then ((images)  => {
                        return images;
                    }).catch ((error) => {
                        return null;
                    });
                }
            }
            
            return properties 
        } catch (error) {
            throw new Error(error.message)
        }

        
    }
}

module.exports = new PropertyServices()