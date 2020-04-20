'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    id: 1,
    email: 'fharellano@uc.cl',
    first_name: 'Felipe',
    last_name: 'Arellano',
    phone_number: '+5612348428',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 2,
    email: 'ebrzovic@uc.cl',
    first_name: 'Esteban',
    last_name: 'Brzovic',
    phone_number: '+5654994593',
    role: 'cai',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 3,
    email: 'jeschuwirth@uc.cl',
    first_name: 'Juan',
    last_name: 'Schuwirth',
    phone_number: '+5615786458',
    role: 'common',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 4,
    email: 'dlleal@uc.cl',
    first_name: 'Daniel',
    last_name: 'Leal',
    phone_number: '+5685424597',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 5,
    email: 'jtescobar1@uc.cl',
    first_name: 'Jose',
    last_name: 'Escobar',
    phone_number: '+5694568512',
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
