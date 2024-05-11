const propertyServices = require("../services/property-services");

class PropertyController {
    async getProperties(req, res) {
        try {
            const id = req.params.id;
            const properties = await propertyServices.getProperties(id);
            return res.status(200).json({status: "success", message: "All properties", data: properties});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

}

module.exports = new PropertyController()