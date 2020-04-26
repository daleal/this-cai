'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'users',
      ['email'],
      {
        indexName: 'email_index',
        indicesType: 'UNIQUE',
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('users', 'email_index');
  }
};
