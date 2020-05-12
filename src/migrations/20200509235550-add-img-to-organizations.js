'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'organizations',
      'img',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'organizations',
      'img',
    );
  }
};
