'use strict';

module.exports = (sequelize, DataTypes) => {
  const lostItem = sequelize.define('lostItem', {
    description: DataTypes.TEXT,
    taken: DataTypes.BOOLEAN,
    img: DataTypes.STRING,
  }, { underscored: true });

  return lostItem;
};
