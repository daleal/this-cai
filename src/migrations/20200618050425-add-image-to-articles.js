'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'articles',
      'img',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'articles',
      'img',
    );
  }
};
