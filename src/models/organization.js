'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  organization.beforeCreate(saveImage);
  organization.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(organization.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });

  organization.associate = function(models) {
    organization.belongsToMany(models.user, { through: 'organization_members' });
    organization.hasMany(models.project);
    organization.hasMany(models.article);
    organization.hasMany(models.event);
  };

  return organization;
};
