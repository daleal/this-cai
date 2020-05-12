'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const inventoryItem = sequelize.define('inventoryItem', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    maxStock: DataTypes.INTEGER,
    currentStock: DataTypes.INTEGER,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  inventoryItem.beforeCreate(saveImage);
  inventoryItem.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(inventoryItem.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });

  inventoryItem.associate = function (models) {
    inventoryItem.hasMany(models.reservation);
  };

  return inventoryItem;
};
