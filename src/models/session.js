'use strict';

const { SESSION_DURATION } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expiration: {
      type: DataTypes.DATE,
      defaultValue: () => Date.now() + 1000 * SESSION_DURATION,
    },
  }, { underscored: true });

  session.prototype.isValid = function isValid() {
    return Date.now() < this.expiration;
  };

  session.prototype.invalidate = async function invalidate() {
    this.set('expiration', Date.now());
  };

  session.associate = function(models) {
    session.belongsTo(models.user);
  };

  return session;
};
