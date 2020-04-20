'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('organizations', [{
    id: 1,
    name: 'PreU',
    description: 'A punto de cumplir 15 años, el Preu es un proyecto que busca ayudar a alumnos de sectores vulnerables para rendir una mejor PSU. Nuestra motivación es darle una oportunidad a quienes buscan entrar a la carrera de sus sueños. Nuestro equipo está formado por estudiantes de la UC que ayudan a nuestros alumnos con material de estudio, apoyo y orientación académica mediante muchas actividades todo el año. Están todos invitados a acercarse a la sala del Preu (al costado del Punto Break de Ingeniería) y compartir con el equipo que hace todo esto posible. ¡Nuestra comunidad existe tanto dentro como fuera de la sala de clases!',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 2,
    name: 'Trabajos de Invierno (TDI)',
    description: 'Trabajos de Invierno es una iniciativa voluntaria que, en sus 19 años de historia, ha generado proyectos como Techo para Chile y ha sido pionera en su evolución. Actualmente, su objetivo es entregar herramientas de superación de la pobreza y casa básicas a familias de la novena región. Este es realizado a través del trabajo y formación de voluntarios durante el año en distintas comisiones que permiten su realización, para finalizar luego de 10 días de construcción en el invierno. Cada año comienza con una gran familia TDI, llena de oportunidades y desafíos, de los que tú puedes ser parte. ¡Te invitamos a pertenecer a esta gran familia que cuenta con miles de voluntarios dispuestos a cambiar el rumbo de Chile y servir al país!',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 3,
    name: 'La Resistencia',
    description: 'En la Resistencia somos los representantes de la cultura Maker en la UC. Somos una comunidad que busca romper las barreras técnicas y culturales que limitan la innovación a través de la creación de proyectos y talleres en lo que los integrantes puedan aprender en forma entretenida del proceso. Promovemos instancias colaborativas en donde resistentes nuevos y experimentados compartan conocimiento en comunidad',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 4,
    name: 'Pastoral',
    description: 'La Pastoral de Ingeniería busca ser una alternativa para los estudiantes de a facultad, a vivir su vida universitaria de forma Cristiana. Esto quiere decir, participar en proyectos cuya esencia es el amor al prójimo, ya sea en apostolados como también en actividades formativas. Los proyectos emblemáticos de la Pastoral son las Misiones Santa Teresa y Trabajos San Agustín, que se realizan junto a nuestras queridas compañeras de pedagogía. Las Comunidades son también, una instancia donde se reúnen un grupo de compañeros cada dos semanas para formarse y también compartir experiencias. Como estos, hay muchos otros proyectos y apostolados, por lo que la Pastoral tendrá siempre un lugar para todo aquel que quiera participar, y lo recibirá con los brazos abiertos.',
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    id: 5,
    name: 'CPU',
    description: 'CPU es un proyecto que busca reciclar computadores viejos o en desuso y habilitarlos para poder donarlos a personas que los necesiten. Queremos impulsar el reciclaje y la ayuda tecnológica en nuestro país. ¿Cómo? Reunimos grupos de voluntarios que, luego de ser capacitados y conocer a sus beneficiarios, se harán cargo de desarrollar el reciclaje y habilitación de los computadores, para finalmente concluir con la capacitación de las personas que recibirán los computadores. Buscamos disminuir la profunda brecha tecnológica que existe hoy en nuestro país, como también ayudar en el sentido ecológico, ya que ayudamos a reducir la gran cantidad de basura electrónica que se produce en nuestro país.',
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('organizations', null, {}),
};
