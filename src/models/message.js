'use strict';

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.TEXT,
    email: DataTypes.STRING,
    opened: DataTypes.BOOLEAN,
    responded: DataTypes.BOOLEAN,
    caiMessage: DataTypes.BOOLEAN,
  }, { underscored: true });

  message.associate = function(models) {
    message.belongsTo(models.user);
  };

  return message;
};
