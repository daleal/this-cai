'use strict';

module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    returned: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
  }, { underscored: true });
  // reservation.associate = function(models) {
  //   // associations can be defined here
  // };
  return reservation;
};
