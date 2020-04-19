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
    user.hasMany(models.lostItem);
    user.belongsToMany(models.inventoryItem, { through: 'user_inventory_items' });
    user.hasMany(models.message);
    user.belongsToMany(models.event, { through: 'event_users' });
  };
  return user;
};
