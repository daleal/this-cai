'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'inventory_items',
      'img',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'inventory_items',
      'img',
    );
  }
};
