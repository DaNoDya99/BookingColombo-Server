'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

       Property.belongsTo(models.Property_owner, {
          foreignKey: 'propertyOwnerId',
          onDelete: 'CASCADE'}
       );

       Property.hasMany(models.Wishlist, {
        foreignKey: 'propertyCode',
        onDelete: 'CASCADE'
       });

         Property.hasMany(models.Property_image, {
             foreignKey: 'propertyCode',
                as: 'propertyImages',
                onDelete: 'CASCADE'
            });
    }
  }
  Property.init({
    propertyCode: DataTypes.STRING,
    type: DataTypes.STRING,
    roomDetails: DataTypes.STRING,
    price: DataTypes.STRING,
    facilityDetails: DataTypes.STRING,
    location: DataTypes.STRING,
    propertyOwnerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Property',
    timestamps: false
  });
  return Property;
};