'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeCode: {
        type: Sequelize.STRING
      },
      travellerID: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.STRING
      },
        rating: {
            type: Sequelize.INTEGER
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};