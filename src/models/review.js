'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Place, {
        foreignKey: 'placeCode',
        onDelete: 'CASCADE'
      });

      Review.belongsTo(models.Traveller, {
        foreignKey: 'travellerID',
        onDelete: 'CASCADE'
      });
    }
  }
  Review.init({
    placeCode: DataTypes.STRING,
    travellerID: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    timestamps: false
  });
  return Review;
};