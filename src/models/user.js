'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { underscored: true });
  user.associate = function(models) {
    user.belongsToMany(models.organization, { through: 'organization_members' });
    user.belongsToMany(models.event, { through: 'event_users' });
    user.hasMany(models.reservation);
    user.hasMany(models.lostItem);
    user.hasMany(models.message);
  };
  return user;
};
