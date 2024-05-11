'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.Property,{
        foreignKey: 'propertyCode',
        onDelete: 'CASCADE'
      });

      Wishlist.belongsTo(models.Traveller,{
        foreignKey: 'travellerID',
        onDelete: 'CASCADE'
      });
    }
  }
  Wishlist.init({
    propertyCode: DataTypes.STRING,
    travellerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wishlist',
    timestamps: false
  });
  return Wishlist;
};