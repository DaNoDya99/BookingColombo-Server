'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const hashedPassword = await bcrypt.hash('Akila@123', 10);

    return queryInterface.bulkInsert('Travellers', [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          password: hashedPassword,
          contact: '1234567890',
          registeredDate: new Date()
        }
      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Travellers', null, {});
  }
};
