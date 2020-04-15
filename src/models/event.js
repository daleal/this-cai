'use strict';

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    dateAndTime: DataTypes.DATE,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
  }, { underscored: true });
  // event.associate = function(models) {
    // associations can be defined here
  // };
  return event;
};
