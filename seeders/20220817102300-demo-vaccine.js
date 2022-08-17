'use strict';
const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const vaccines = JSON.parse(fs.readFileSync('./data/vaccines.json', 'utf-8')).map(vaccine => {
      return {
        ...vaccine,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Vaccines', vaccines);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Vaccines', null, {});
  }
};
