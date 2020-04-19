'use strict';

module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, { underscored: true });
  // organization.associate = function(models) {
  //   // associations can be defined here
  // };
  return organization;
};
