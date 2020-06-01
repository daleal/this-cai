'use strict';

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.TEXT,
    email: DataTypes.STRING,
    opened: DataTypes.BOOLEAN,
  }, { underscored: true });

  return message;
};
