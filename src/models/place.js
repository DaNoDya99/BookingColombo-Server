'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Place.hasMany(models.Review, {
        foreignKey: 'placeCode',
        onDelete: 'CASCADE'
      });

      Place.hasMany(models.Place_image, {
        foreignKey: 'placeCode',
           as: 'placeImages',
           onDelete: 'CASCADE'
      });
    }
  }
  Place.init({
    placeCode: DataTypes.STRING,
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    openTime: DataTypes.TIME,
    closingTime: DataTypes.TIME,
    location: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Place',
    timestamps: false
  });
  return Place;
};