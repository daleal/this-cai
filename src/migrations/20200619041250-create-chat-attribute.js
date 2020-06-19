'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'messages',
      'cai_message',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'messages',
      'cai_message'
    );
  }
};
