'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    contactInfo: DataTypes.TEXT,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  project.beforeCreate(saveImage);
  project.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(project.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });
  project.associate = function(models) {
    project.belongsTo(models.organization);
  };

  return project;
};
