'use strict';

module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    contactInfo: DataTypes.TEXT,
    img: DataTypes.STRING,
  }, { underscored: true });

  project.associate = function(models) {
    project.hasMany(models.event);
  };

  return project;
};
