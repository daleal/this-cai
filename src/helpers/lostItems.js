'use strict';

module.exports = {
  name: 'lostItems',
  validateOwnership: (user, item) => {
    if (item.userId !== user.id) {
      throw new Error('Este objeto no fue reclamado por ti');
    }
  },
  validateNotTaken: (item) => {
    if (item.taken) {
      throw new Error('Este objeto ya fue reclamado');
    }
  },
  userIdToName: (users) => {
    const hash = {};
    users.forEach((user) => {
      hash[user.id] = `${user.firstName} ${user.lastName}`;
    });
    return hash;
  },
};
