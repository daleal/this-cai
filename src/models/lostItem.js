'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const lostItem = sequelize.define('lostItem', {
    description: DataTypes.TEXT,
    locationFound: DataTypes.TEXT,
    taken: DataTypes.BOOLEAN,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  lostItem.beforeCreate(saveImage);
  lostItem.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(lostItem.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });
  lostItem.associate = function (models) {
    lostItem.belongsTo(models.user);
  };
  return lostItem;
};
