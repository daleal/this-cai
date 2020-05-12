'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'projects',
      'img',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'projects',
      'img',
    );
  }
};
