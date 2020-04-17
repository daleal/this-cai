'use strict';

module.exports = (sequelize, DataTypes) => {
  const lostItem = sequelize.define('lostItem', {
    description: DataTypes.TEXT,
    taken: DataTypes.BOOLEAN,
  }, { underscored: true });
  // lostItem.associate = function(models) {
  //   // associations can be defined here
  // };
  return lostItem;
};
