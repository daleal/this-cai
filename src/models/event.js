'use strict';

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    dateAndTime: DataTypes.DATE,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
  }, { underscored: true });
  event.associate = function(models) {
    event.belongsToMany(models.user, { through: 'event_users' });
  };
  return event;
};
