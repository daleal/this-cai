'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'lost_items',
      'img',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'lost_items',
      'img',
    );
  }
};
