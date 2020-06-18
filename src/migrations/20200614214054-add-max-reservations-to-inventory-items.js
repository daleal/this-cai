'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'inventory_items',
      'max_reservations',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'inventory_items',
      'max_reservations',
    );
  },
};
