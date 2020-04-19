'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('messages', [{
    content: '¿Donde hay paletas?',
    mail: 'sespinosa@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: '¿Como van a hacer cosas si solo hay clases online?',
    mail: 'pszapata@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Encuentro que hacen un muy buen trabajo',
    mail: 'mrramirez2@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Se rompio la red de una de las mesas de tenis de mesa',
    mail: 'sespinosa@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    content: 'Como estan?',
    mail: 'rasoto13@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('messages', null, {}),
};
