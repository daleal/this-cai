'use strict';
module.exports = (sequelize, DataTypes) => {
  const LostItem = sequelize.define('LostItem', {
    description: DataTypes.TEXT,
    taken: DataTypes.BOOLEAN
  }, { underscored: true });
  LostItem.associate = function(models) {
    // associations can be defined here
  };
  return LostItem;
};
