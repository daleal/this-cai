'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('messages', [{
    content: '¿Donde hay paletas?',
    email: 'sespinosa@uc.cl',
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: '¿Como van a hacer cosas si solo hay clases online?',
    email: 'pszapata@uc.cl',
    user_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Encuentro que hacen un muy buen trabajo',
    email: 'mrramirez2@uc.cl',
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Se rompio la red de una de las mesas de tenis de mesa',
    email: 'sespinosa@uc.cl',
    user_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Como estan?',
    email: 'rasoto13@uc.cl',
    user_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('messages', null, {}),
};
