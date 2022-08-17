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
    const roles = JSON.parse(fs.readFileSync('./data/roles.json', 'utf-8')).map(role => {
      return {
        ...role,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Roles', roles);
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
