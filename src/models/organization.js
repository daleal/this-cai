'use strict';

module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, { underscored: true });
  organization.associate = function(models) {
    organization.hasMany(models.project);
    organization.belongsToMany(models.user, { through: 'organization_members' });
  };
  return organization;
};
