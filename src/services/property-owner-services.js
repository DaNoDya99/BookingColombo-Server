const {Property_owner} = require('../models');
const {hash, compare} = require("bcrypt");
const {Property, Property_image} = require('../models');
const { where } = require('sequelize');
const {generateIds} = require("../middlewares/functions");

class PropertyOwnerServices {
    async registerPropertyOwner(data) {
        const propertyOwner = await Property_owner.findOne({ where: { email: data.email } }).then((propertyOwner) => {
            return propertyOwner;
        }).catch((error) => {
            return null
        })

        if (propertyOwner) {
            throw new Error("Property owner already exists");
        }

        const hashedPassword = await hash(data.password, 10);

        return await Property_owner.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            contact: data.contact,
        }).then((newPropertyOwner) => {
            return newPropertyOwner;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async loginPropertyOwner(data) {
        try {
            const propertyOwner = await Property_owner.findOne({ where: { email: data.email } });

            if (!propertyOwner) {
                throw new Error("Property owner not found");
            }

            const passwordMatch = await compare(data.password, propertyOwner.password);

            if (!passwordMatch) {
                throw new Error("Invalid password");
            }

            return propertyOwner.dataValues;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProperty(data) {
        try {
            const id = generateIds("PROP")

            const property = {
                propertyCode: id,
                type : data.type,
                roomDetails: data.roomDetails,
                price: data.price,
                facilityDetails: data.facilityDetails,
                location : data.location,
                propertyOwnerId: data.propertyOwnerId
            }

            let imageList = [];

            for (let i = 0; i < data.images.length; i++) {
                imageList.push({
                    propertyCode: id,
                    image: data.images[i].path
                })
            }

            const newProperty = await Property.create(property).then((property) => {
                return property;
            }).catch((error) => {
                return null;
            });

            const newImages = await Property_image.bulkCreate(imageList).then((images) => {
                return images;
            }).catch((error) => {
                return null;
            });

            return newProperty && newImages;
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new PropertyOwnerServices();