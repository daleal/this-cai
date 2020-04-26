'use strict';

const bcrypt = require('bcrypt');

const { PASSWORD_SALT } = require('../constants');

async function buildHash(user) {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(PASSWORD_SALT);
    const digest = await bcrypt.hash(user.password, salt);
    user.set('password', digest);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: { // Validate email
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Ya existe un usuario con ese email en la base de datos.',
      },
      validate: {
        notEmpty: {
          msg: 'Se requiere un email.',
        },
        isEmail: {
          msg: 'Se requiere un email válido.',
        },
      },
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  user.beforeCreate(buildHash);
  user.beforeUpdate(buildHash);

  // Check email and password. Return the user if valid, null if otherwise
  user.authenticate = async (email, password) => {
    const userInstance = await user.findOne({ where: { email } });
    // No user exists with given email
    if (!userInstance) {
      return null;
    }
    // Given password is incorrect
    if (!(await userInstance.checkPassword(password))) {
      return null;
    }
    // Return the user object
    return userInstance;
  };

  // Check password for specific user
  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  user.associate = function(models) {
    user.belongsToMany(models.organization, { through: 'organization_members' });
    user.belongsToMany(models.event, { through: 'event_users' });
    user.hasMany(models.reservation);
    user.hasMany(models.lostItem);
    user.hasMany(models.message);
  };

  return user;
};
