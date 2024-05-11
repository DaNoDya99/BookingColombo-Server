const propertyServices = require("../services/property-services");

class PropertyController {
    async getAllProperties(req, res) {
        try {
            // const id = req.params.id; 
            const properties = await propertyServices.getAllProperties();
            return res.status(200).json({status: "success", message: "All properties of the model property", data: properties});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async getProperties(req, res) {
        try {
            const id = req.params.id;
            const properties = await propertyServices.getProperties(id);
            return res.status(200).json({status: "success", message: "All properties", data: properties});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async getProperty(req, res) {
        try {
            const id = req.params.id;
            const property = await propertyServices.getProperty(id);
            return res.status(200).json({status: "success", message: "Property found", data: property});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async updateProperty(req, res) {
        try {
            const data = req.body;
            const updatedProperty = await propertyServices.updateProperty(data);
            if(!updatedProperty){
                return res.status(500).json({status: "error", message: "An error occurred"});
            }
            return res.status(200).json({status: "success", message: "Property updated successfully", data: updatedProperty});
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }

    async deleteProperty(req, res) {
        try {
            const id = req.params.id;
            const deletedProperty = await propertyServices.deleteProperty(id);
            if(!deletedProperty){
                return res.status(500).json({status: "error", message: "An error occurred"});
            }
            return res.status(200).json({status: "success", message: "Property deleted successfully"});
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }

}

module.exports = new PropertyController()