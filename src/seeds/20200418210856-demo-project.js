'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('projects', [{
    name: 'TDI 2020',
    description: 'Trabajos de Invierno Ingenieria UC para el 2020',
    contact_info: 'TDI2020@uc.cl',
    organization_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226036/seeds/tdi_sudybr.jpg',
  }, {
    name: 'Arcade Cabinet',
    description: 'Construccion de mueble para emular todo tipo de juegos retro',
    contact_info: 'gabo@laresistencia.cl',
    organization_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591229084/seeds/arcade_frkwq4.jpg',
  }, {
    name: 'PreU matematica',
    description: 'Pre-Universitario centrado en matematica',
    contact_info: 'preumates@uc.cl',
    organization_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591229084/seeds/mates_msgrej.jpg',
  }, {
    name: 'PreU Lenguaje',
    description: 'Pre-Universitario centrado en lenguaje',
    contact_info: 'preulenguas@uc.cl',
    organization_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591229085/seeds/lenguaje_ftggvp.png',
  }, {
    name: 'Misiones Santa Teresa',
    description: 'Repartimos la palabra de Dios y acompañamos a la gente de comunidades vulnerables',
    contact_info: 'jesuslalleva@uc.cl',
    organization_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226041/seeds/pastoral_nfkykz.png',
  }, {
    name: 'Reparación computadores',
    description: 'Reparamos computadores para donarlos a personas que los necesiten',
    contact_info: 'cputeam@uc.cl',
    organization_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591229085/seeds/reparacion_lgfgcb.gif',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('projects', null, {}),
};
