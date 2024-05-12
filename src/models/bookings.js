'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    arrival_date: DataTypes.DATEONLY,
    departure_date: DataTypes.DATEONLY,
    noOfPeople: DataTypes.INTEGER,
    propertyCode: DataTypes.STRING,
    travellerID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookings',
    timestamps: false
  });
  return Bookings;
};