'use strict';

module.exports = (sequelize, DataTypes) => {
  const inventoryItem = sequelize.define('inventoryItem', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    maxStock: DataTypes.INTEGER,
    currentStock: DataTypes.INTEGER,
  }, { underscored: true });
  inventoryItem.associate = function (models) {
    inventoryItem.belongsToMany(models.user, { through: 'user_inventory_items' });
  };
  return inventoryItem;
};
