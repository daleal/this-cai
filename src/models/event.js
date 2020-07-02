'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    dateAndTime: DataTypes.DATE,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  event.beforeCreate(saveImage);
  event.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(event.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });

  event.associate = function(models) {
    event.belongsToMany(models.user, { through: 'event_users' });
    event.belongsTo(models.organization);
    event.hasMany(models.comment);
  };

  return event;
};
