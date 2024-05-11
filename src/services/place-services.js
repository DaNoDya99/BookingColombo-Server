const { where } = require("sequelize")
const {Place, Place_image} = require("../models")
const {generateIds} = require("../middlewares/functions");

class PlaceService{
    async addPlace(data) {
        try {
            const id = generateIds("PROP")

            const place = {
                placeCode: id,
                category : data.category,
                name: data.name,
                description: data.description,
                openTime: data.openTime,
                closingTime: data.closingTime,
                location : data.location,
                rating: data.rating
            }

            let imageList = [];

            for (let i = 0; i < data.images.length; i++) {
                imageList.push({
                    placeCode: id,
                    image: data.images[i].path
                })
            }

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

            return newPlace && newImages;
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
}

module.exports = new PlaceService()
