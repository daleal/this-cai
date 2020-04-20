'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('event_users', [{
    event_id: 1,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_id: 2,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_id: 4,
    user_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_id: 5,
    user_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_id: 3,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    event_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('event_users', null, {}),
};
