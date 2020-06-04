'use strict';

module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    returned: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
  }, { underscored: true });

  reservation.associate = function(models) {
    reservation.belongsTo(models.user);
    reservation.belongsTo(models.inventoryItem);
  };
  return reservation;
};
