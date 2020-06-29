'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('events', [{
    name: 'Fiesta donde Brzo',
    date_and_time: new Date('2020-10-09T21:30:00'),
    category: 'Recreación',
    location: 'Casa de Brzo',
    organization_id: 2,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593384424/events/1/1593384424.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Cuarentena',
    date_and_time: new Date('2020-04-22T16:00:00'),
    category: 'Inclusión',
    location: 'Residencia personal',
    organization_id: 4,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593384615/events/2/1593384615.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Inicio semana novata',
    date_and_time: new Date('2020-05-12T14:30:00'),
    category: 'Orientación',
    location: 'Patio de Ingenieria',
    organization_id: 5,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593384711/events/3/1593384711.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Programaton',
    date_and_time: new Date('2020-06-22T16:00:00'),
    category: 'Académico',
    location: 'Sala de Estudio K',
    organization_id: 3,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593384889/events/4/1593384888.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Campeonato Tenis de mesa',
    date_and_time: new Date('2020-04-28T13:50:00'),
    category: 'Deportes',
    location: 'Mesas de Ping-Pong',
    organization_id: 2,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593384985/events/5/1593384985.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('events', null, {}),
};
