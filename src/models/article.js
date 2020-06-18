'use strict';

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, { underscored: true });
  article.associate = function(models) {
    article.belongsTo(models.organization);
  };

  return article;
};
