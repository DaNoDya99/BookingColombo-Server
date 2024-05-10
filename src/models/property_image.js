'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Property_image.belongsTo(models.Property, {
            foreignKey: 'propertyId',
            as: 'property',
            onDelete: 'CASCADE'
        });
    }
  }
  Property_image.init({
    propertyId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Property_image',
    timestamps: false
  });
  return Property_image;
};