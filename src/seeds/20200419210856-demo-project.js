'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('projects', [{
    name: 'TDI 2020',
    description: 'Trabajos de Invierno Ingenieria UC para el 2020',
    contact_info: 'TDI2020@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Arcade Cabinet',
    description: 'Construccion de mueble para emular todo tipo de juegos retro',
    contact_info: 'gabo@laresistencia.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'PreU matematica',
    description: 'Pre-Universitario centrado en matematica',
    contact_info: 'preumates@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'PreU Lenguaje',
    description: 'Pre-Universitario centrado en lenguaje',
    contact_info: 'preulenguas@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Misiones Santa Teresa',
    description: 'Repartimos la palabra de Dios y acompañamos a la gente de comunidades vulnerables',
    contact_info: '',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'Reparación computadores',
    description: 'Reparamos computadores para donarlos a personas que los necesiten',
    contact_info: 'cputeam@uc.cl',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('projects', null, {}),
};
