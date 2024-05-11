const {Place, Place_image} = require("../models")
const {generateIds} = require("../middlewares/functions");

class PlaceService{
    async addPlace(data) {
        try {
            const id = generateIds("PLACE")

            const place = {
                placeCode: id,
                category : data.category,
                name: data.place,
                description: data.description,
                openTime: data.opening_time+':00',
                closingTime: data.closing_time+':00',
                location : data.location,
                rating: 0
            }

            let imageList = [];

            for (let i = 0; i < data.images.length; i++) {
                imageList.push({
                    placeCode: id,
                    image: data.images[i].path
                })
            }

            console.log(place);
            console.log(imageList);

            const newPlace = await Place.create(place).then((place) => {
                return place;
            }).catch((error) => {
                return null;
            });

            const newImages = await Place_image.bulkCreate(imageList).then((images) => {
                return images;
            }).catch((error) => {
                return null;
            });

            return  newPlace && newImages;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    async getPlace(id) {
        try{
            const places = await Place.findAll();
            if(places) {
                for(let place in places) {
                    const images = await Place_image.findAll({
                        where: {
                            placeCode: places[place].dataValues.placeCode
                        }
                    }).then ((images)  => {
                        return images;
                    }).catch ((error) => {
                        return null;
                    });
                    places[place].dataValues.images = images;
                }
            }
            // console.log(places[0].dataValues);
            return places 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPlaces() {
        try {
            const places = await Place.findAll();
            if(places) {
                for(let place in places) {
                    const images = await Place_image.findAll({
                        where: {
                            placeCode: places[place].dataValues.placeCode
                        }
                    }).then ((images)  => {
                        return images;
                    }).catch ((error) => {
                        return null;
                    });
                    places[place].dataValues.images = images;
                }
            }
            // console.log(places[0].dataValues);
            return places
        } catch (error) {
            throw new Error(error)
        }
    }

    async deletePlace(id) {
        try {
            const place = await Place.findOne({
                where: {
                    placeCode: id
                }
            });

            if (!place) {
                throw new Error("Place not found");
            }

            await Place.destroy({
                where: {
                    placeCode: id
                }
            });

            return place;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePlace(data) {
        try {
            const place = await Place.findOne({
                where: {
                    placeCode: data.placeCode
                }
            });

            if (!place) {
                throw new Error("Place not found");
            }

            const updatedPlace = await Place.update(
                {
                    category: data.category,
                    name: data.place,
                    description: data.description,
                    openTime: data.opening_time+':00',
                    closingTime: data.closing_time+':00',
                    location: data.location
                },
                {
                    where: {
                        placeCode: data.placeCode
                    }
                }
            ).then((updatedPlace) => {
                return updatedPlace;
            }).catch((error) => {
                return null;
            });

            return updatedPlace;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new PlaceService()
