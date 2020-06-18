'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('articles', [{
    title: 'Victoria Sigma',
    content: 'Despues de una dura campaña y una pandemia mundial, en nuevo CAi es Sigma.',
    organization_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Covid-19 declarado pademia',
    content: 'Hoy en la tarde la OMS ha actualizado el estado de la enfermedad Covid-19, coloquialmente conocida como coronavirus, a la categoria de pandemia, esto refleja la verdadera gravedad de la situación y la necesidad del govierno de tomar medidas drasticas para protejer la salud de los ciudadanos del pais.',
    organization_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Se crea la CAi App',
    content: 'Un grupo de estudiantes de la facultad han creado la aplicacion CAi App como parte del ramo IIC2513. ¿Será tan buena como plantean?',
    organization_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Google cambia el funcionamiento de API de LogIn',
    content: 'Google cambió el funcionamiento del LogIn del mismo para uso en aplicaciones privadas, confundiendo a miles de app developers en el mundo.',
    organization_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    title: 'Empresario escapa de cuarentena en Helicoptero',
    content: 'Se subió a su helicoptero "de camino" a comprar unos remedios dice.',
    organization_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('articles', null, {}),
};
