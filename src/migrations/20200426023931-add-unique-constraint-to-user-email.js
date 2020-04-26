'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'unique_email',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'unique_email');
  }
};
