'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Jimbo Slice',
        password: 'fake password 1'
      }, {
        username: 'Tommy McMann',
        password: 'fake password 2'
      }, {
        username: 'Kevin Hart',
        password: 'fake password 3'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
