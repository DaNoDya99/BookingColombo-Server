const propertyOwnerService = require('../services/property-owner-services');

class PropertyOwnerController{
    async registerPropertyOwner(req, res){
        try {
            const data = req.body;
            const createdPropertyOwner = await propertyOwnerService.registerPropertyOwner(data);

            return res.status(201).json({status: "success", message: "Property owner created successfully", data: createdPropertyOwner});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async loginPropertyOwner(req, res){
        try {
            const data = req.body;
            const propertyOwner = await propertyOwnerService.loginPropertyOwner(data);

            return res.status(200).json({status: "success", message: "Property owner logged in successfully", data: propertyOwner});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addProperty(req, res) {
        try{
            const data = req.body;
            const createdProperty = await propertyOwnerService.addProperty(data);

            return res.status(201).json({status: "success", message: "Property added successfully", data: createdProperty});
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new PropertyOwnerController();