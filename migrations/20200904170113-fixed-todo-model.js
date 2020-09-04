'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'paaword', 'password')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'paaword')
  }
};
