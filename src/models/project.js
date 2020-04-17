'use strict';

module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    contactInfo: DataTypes.TEXT,
  }, { underscored: true });
  // projects.associate = function(models) {
  //   // associations can be defined here
  // };
  return project;
};
