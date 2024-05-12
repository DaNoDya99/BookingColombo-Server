'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      arrival_date: {
        type: Sequelize.DATE
      },
      departure_date: {
        type: Sequelize.DATE
      },
      noOfPeople: {
        type: Sequelize.INTEGER
      },
      propertyCode: {
          type: Sequelize.STRING
      },
      travellerID: {
          type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};