'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traveller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Traveller.hasMany(models.Wishlist, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      });

      Traveller.hasMany(models.Review, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  }
  Traveller.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    contact: DataTypes.STRING,
    registeredDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Traveller',
    timestamps: false
  });
  return Traveller;
};