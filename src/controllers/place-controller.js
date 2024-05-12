const placeServices = require("../services/place-services");

class PlaceController {
    async addPlace(req, res) {
        try{
            const data = req.body;
            data.images = req.files
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
            console.log(id);
            const place = await placeServices.getPlace(id);
            console.log("b",place);
            return res.status(200).json({status: "success", message: "Place found", data: place});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async getAllPlaces(req, res) {
        try {
            const properties = await placeServices.getPlaces();
            return res.status(200).json({status: "success", message: "All places", data: properties});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    async deletePlace(req, res) {
        try {
            const id = req.params.id;
            const deletedPlace = await placeServices.deletePlace(id);
            if(deletedPlace) {
                return res.status(200).json({status: "success", message: "Place deleted successfully"});
            } else {
                return res.status(500).json({status: "error", message: "An error occurred"});
            }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async updatePlace(req, res) {
        try {
            const data = req.body;
            const updatedPlace = await placeServices.updatePlace(id, data);
            if(updatedPlace) {
                return res.status(200).json({status: "success", message: "Place updated successfully", data: updatedPlace});
            } else {
                return res.status(500).json({status: "error", message: "An error occurred"});
            }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new PlaceController()
