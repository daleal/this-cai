'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('events', [{
    name: 'Fiesta donde Brzo',
    date_and_time: new Date('2020-10-09T21:30:00'),
    category: 'Fiesta',
    location: 'Casa de Brzo',
    project_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Cuarentena',
    date_and_time: new Date('2020-04-22T16:00:00'),
    category: 'Orden',
    location: 'Residencia personal',
    project_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Inicio semana novata',
    date_and_time: new Date('2020-05-12T14:30:00'),
    category: 'Novates',
    location: 'Patio de Ingenieria',
    project_id: 6,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Programaton',
    date_and_time: new Date('2020-06-22T16:00:00'),
    category: 'Estudio',
    location: 'Sala de Estudio K',
    project_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Campeonato Tenis de mesa',
    date_and_time: new Date('2020-04-28T13:50:00'),
    category: 'Deporte',
    location: 'Mesas de Ping-Pong',
    project_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('events', null, {}),
};
