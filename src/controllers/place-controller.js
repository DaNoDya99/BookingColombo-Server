const placeServices = require("../services/place-services");

class PlaceController {
    async addPlace(req, res) {
        try{
            console.log(req.body);
            const data = req.body;
            data.images = req.files
            console.log("check",data);
            const createdPlace = await placeServices.addPlace(data);
            console.log("hi",createdPlace);
            if(!createdPlace){
                return res.status(500).json({status: "error", message: "An error occurred"});
            }
            return res.status(201).json({status: "success", message: "Place added successfully", data: createdPlace});
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }

    async getPlaces(req, res) {
        try {
            const id = req.params.id;
            const properties = await placeServices.getPlace(id);
            return res.status(200).json({status: "success", message: "All places", data: properties});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = new PlaceController()
