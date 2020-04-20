'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('events', [{
    id: 1,
    name: 'Fiesta donde Brzo',
    date_and_time: new Date('2020-10-09T18:30:00'),
    category: 'Fiesta',
    location: 'Casa de Brzo',
    project_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 2,
    name: 'Cuarentena',
    date_and_time: new Date('2020-04-22T12:00:00'),
    category: 'Orden',
    location: 'Residencia personal',
    project_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 3,
    name: 'Inicio semana novata',
    date_and_time: new Date('2020-05-12T08:30:00'),
    category: 'Novates',
    location: 'Patio de Ingenieria',
    project_id: 6,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 4,
    name: 'Programaton',
    date_and_time: new Date('2020-06-22T12:00:00'),
    category: 'Estudio',
    location: 'Sala de Estudio K',
    project_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 5,
    name: 'Campeonato Tenis de mesa',
    date_and_time: new Date('2020-04-28T12:50:00'),
    category: 'Deporte',
    location: 'Mesas de Ping-Pong',
    project_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('events', null, {}),
};
