'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('organization_members', [{
    organization_id: 1,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    organization_id: 2,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    organization_id: 4,
    user_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    organization_id: 5,
    user_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    organization_id: 3,
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    organization_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('organization_members', null, {}),
};
