'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    email: 'fharellano@uc.cl',
    first_name: 'Felipe',
    last_name: 'Arellano',
    phone_number: '+5612348428',
    role: 'administrator',
    password: '$2b$10$Ncr7vaIceQF3ZMWB.a8wNOPs6gpZnTyJLlT8dc4jafjCLxwPopos6',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    email: 'ebrzovic@uc.cl',
    first_name: 'Esteban',
    last_name: 'Brzovic',
    phone_number: '+5654994593',
    role: 'cai',
    password: '$2b$10$Ncr7vaIceQF3ZMWB.a8wNOPs6gpZnTyJLlT8dc4jafjCLxwPopos6',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    email: 'jeschuwirth@uc.cl',
    first_name: 'Juan',
    last_name: 'Schuwirth',
    phone_number: '+5615786458',
    role: 'user',
    password: '$2b$10$Ncr7vaIceQF3ZMWB.a8wNOPs6gpZnTyJLlT8dc4jafjCLxwPopos6',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    email: 'dlleal@uc.cl',
    first_name: 'Daniel',
    last_name: 'Leal',
    phone_number: '+5685424597',
    role: 'administrator',
    password: '$2b$10$Ncr7vaIceQF3ZMWB.a8wNOPs6gpZnTyJLlT8dc4jafjCLxwPopos6',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    email: 'jtescobar1@uc.cl',
    first_name: 'Jose',
    last_name: 'Escobar',
    phone_number: '+5694568512',
    role: 'administrator',
    password: '$2b$10$Ncr7vaIceQF3ZMWB.a8wNOPs6gpZnTyJLlT8dc4jafjCLxwPopos6',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
