'use strict';

const { assetPath, saveImage } = require('../helpers/global');
const { LANDSCAPE_PLACEHOLDER_IMAGE } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  article.beforeCreate(saveImage);
  article.beforeUpdate(saveImage);

  // Properties
  Object.defineProperties(article.prototype, {
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });

  article.associate = function(models) {
    article.belongsTo(models.organization);
  };

  return article;
};
