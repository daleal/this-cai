'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('messages', [{
    content: '¿Donde hay paletas?',
    email: null,
    user_id: 3,
    cai_message: false,
    opened: false,
    responded: false,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: '¿Como van a hacer cosas si solo hay clases online?',
    email: 'pszapata@uc.cl',
    user_id: null,
    cai_message: false,
    opened: false,
    responded: false,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Encuentro que hacen un muy buen trabajo',
    email: 'mrramirez2@uc.cl',
    user_id: null,
    cai_message: false,
    opened: false,
    responded: false,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Se rompio la red de una de las mesas de tenis de mesa',
    email: null,
    user_id: 4,
    cai_message: false,
    opened: false,
    responded: false,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Como estan?',
    email: null,
    user_id: 5,
    cai_message: false,
    opened: false,
    responded: false,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('messages', null, {}),
};
