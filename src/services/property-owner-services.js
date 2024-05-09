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
        const propertyID = await property.findOne({where: {id: data.id}}).then((propertyID) => {
            return propertyID;
        }).catch((error) => {
            return null
        })

        if(propertyID) {
            throw new Error("Property already exist!");
        }

        return await property.create({
            Type: data.Type,
            RoomDetails: data.RoomDetails,
            price: data.price,
            FacilityDetails: data.FacilityDetails,
            Image: data.Image,
            Location: data.Location,
        }).then((newProperty) => {
            return newProperty;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }
}

module.exports = new PropertyOwnerServices();