'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('events', [{
    name: 'Fiesta donde Brzo',
    date_and_time: new Date('2020-10-09T18:30:00'),
    category: 'Fiesta',
    location: 'Casa de Brzo',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Cuarentena',
    date_and_time: new Date('2020-04-22T12:00:00'),
    category: 'Orden',
    location: 'Residencia personal',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Inicio semana novata',
    date_and_time: new Date('2020-05-12T08:30:00'),
    category: 'Novates',
    location: 'Patio de Ingenieria',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Programaton',
    date_and_time: new Date('2020-06-22T12:00:00'),
    category: 'Estudio',
    location: 'Sala de Estudio K',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Campeonato Tenis de mesa',
    date_and_time: new Date('2020-04-28T12:50:00'),
    category: 'Deporte',
    location: 'Mesas de Ping-Pong',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('events', null, {}),
};
