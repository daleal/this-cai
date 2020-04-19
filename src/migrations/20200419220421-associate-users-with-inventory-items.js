'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_inventory_items', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      inventory_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_inventory_items');
  }
};
