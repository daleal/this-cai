'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'inventory_items',
      'img',
      {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/grupothislocal/image/upload/v1589064341/default_k2hjgm.jpg',
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