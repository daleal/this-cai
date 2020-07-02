'use strict';

module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    author: DataTypes.STRING,
  }, { underscored: true });
  comment.associate = function(models) {
    comment.belongsTo(models.user);
    comment.belongsTo(models.event);
  };
  return comment;
};
