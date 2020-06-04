'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'messages',
      'responded',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'messages',
      'responded',
    );
  },
};
