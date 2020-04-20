'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'reservations',
      'inventory_item_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'inventory_items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'reservations',
      'inventory_item_id',
    );
  },
};
