'use strict';

module.exports = (sequelize, DataTypes) => {
  const inventoryItem = sequelize.define('inventoryItem', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    maxStock: DataTypes.INTEGER,
    currentStock: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, { underscored: true });

  inventoryItem.associate = function (models) {
    inventoryItem.hasMany(models.reservation);
  };

  return inventoryItem;
};
