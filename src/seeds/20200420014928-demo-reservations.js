'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('reservations', [{
    returned: false,
    due_date: new Date(),
    user_id: 2,
    inventory_item_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    returned: true,
    due_date: new Date(),
    user_id: 2,
    inventory_item_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('reservations', null, {}),
};
