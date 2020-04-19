'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { underscored: true });
  // user.associate = function(models) {
  //   // associations can be defined here
  // };
  return user;
};
