'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('articles', [{
    title: 'Victoria Sigma',
    content: 'Despues de una dura campaña y una pandemia mundial, en nuevo CAi es Sigma.',
    organization_id: 1,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593371078/articles/1/1593371078.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Covid-19 declarado pademia',
    content: 'Hoy en la tarde la OMS ha actualizado el estado de la enfermedad Covid-19, coloquialmente conocida como coronavirus, a la categoria de pandemia, esto refleja la verdadera gravedad de la situación y la necesidad del govierno de tomar medidas drasticas para protejer la salud de los ciudadanos del pais.',
    organization_id: 2,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593371142/articles/2/1593371142.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Se crea la CAi App',
    content: 'Un grupo de estudiantes de la facultad han creado la aplicacion CAi App como parte del ramo IIC2513. ¿Será tan buena como plantean?',
    organization_id: 5,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593379540/articles/3/1593379539.png',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Google cambia el funcionamiento de API de LogIn',
    content: 'Google cambió el funcionamiento del LogIn del mismo para uso en aplicaciones privadas, confundiendo a miles de app developers en el mundo.',
    organization_id: 3,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593381920/articles/4/1593381920.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Empresario escapa de cuarentena en Helicoptero',
    content: 'Se subió a su helicoptero "de camino" a comprar unos remedios dice.',
    organization_id: 4,
    img: 'https://res.cloudinary.com/hyysk1pwj/image/upload/v1593382032/articles/5/1593382032.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('articles', null, {}),
};
