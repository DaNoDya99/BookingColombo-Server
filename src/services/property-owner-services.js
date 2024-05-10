const {Property_owner} = require('../models');
const {hash, compare} = require("bcrypt");
const property = require('../models/property');
const { where } = require('sequelize');

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
            const property = {
                type : data.type,
                roomDetails: data.roomDetails,
                price: data.price,
                facilityDetails: data.facilityDetails,
                location : data.location,
                propertyOwnerId: data.propertyOwnerId
            }
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new PropertyOwnerServices();