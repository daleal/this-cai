'use strict';

module.exports = {
  name: 'dashboard',
  reservationZipper: async (reservations) => {
    const reservationsArray = [];
    let userArray = [];
    let itemsArray = [];
    for (let i = 0; i < reservations.length; i += 1) {
      const user = reservations[i].getUser();
      const item = reservations[i].getInventoryItem();
      userArray.push(user);
      itemsArray.push(item);
      reservationsArray.push({ reservation: reservations[i] });
    }

    userArray = await Promise.all(userArray);
    itemsArray = await Promise.all(itemsArray);

    for (let i = 0; i < reservations.length; i += 1) {
      reservationsArray[i].item = itemsArray[i];
      reservationsArray[i].user = userArray[i];
    }
    return reservationsArray;
  },

};
