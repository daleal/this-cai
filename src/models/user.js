'use strict';

const bcrypt = require('bcrypt');

const { assetPath, saveImage } = require('../helpers/global');
const {
  PASSWORD_SALT,
  USER_ROLES,
  USER_ROLE_PRIVILEGES,
  LANDSCAPE_PLACEHOLDER_IMAGE,
} = require('../constants');

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
    role: {
      type: DataTypes.STRING,
      defaultValue: USER_ROLES.user,
    },
    password: DataTypes.STRING,
    img: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  user.beforeCreate(saveImage);
  user.beforeUpdate(saveImage);
  user.beforeCreate(buildHash);
  user.beforeUpdate(buildHash);

  // Properties
  Object.defineProperties(user.prototype, {
    isCAi: {
      get: function isCAi() {
        // Returns true if user has AT LEAST level CAi permissions
        const userPrivileges = USER_ROLE_PRIVILEGES[this.role];
        const expectedPrivileges = USER_ROLE_PRIVILEGES[USER_ROLES.cai];
        if (userPrivileges < expectedPrivileges) {
          return false;
        }
        return true;
      },
    },
    isAdministrator: {
      get: function isAdministrator() {
        // Returns true if user has AT LEAST level administrator permissions
        const userPrivileges = USER_ROLE_PRIVILEGES[this.role];
        const expectedPrivileges = USER_ROLE_PRIVILEGES[USER_ROLES.administrator];
        if (userPrivileges < expectedPrivileges) {
          return false;
        }
        return true;
      },
    },
    image: {
      get: function image() {
        return this.img ? this.img : assetPath(LANDSCAPE_PLACEHOLDER_IMAGE);
      },
    },
  });

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
    user.hasMany(models.session);
  };

  return user;
};
