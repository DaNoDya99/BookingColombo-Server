'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Place_image.belongsTo(models.Place, {
        foreignKey: 'placeCode',
        as: 'place',
        onDelete: 'CASCADE'
    });
    }
  }
  Place_image.init({
    placeCode: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Place_image',
  });
  return Place_image;
};