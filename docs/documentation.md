# Documentación This CAi

## Introducción

This CAi en una aplicación web cuyo objetivo es servir como plataforma virtual donde el Centro de Alumnos de Ingeniería puede reducir la brecha entre ellos y el estudiantado, ofreciendo información relevante junto con servicios para mejorar la experiencia universitaria. Fácil de usar, 100% _responsive_, generar interacción con el estudiantado nunca fue tan fácil, cómodo ni efectivo.

#### Información y difusión

La aplicación provee una visualización de la estructura interna del centro de alumnos. Existen diversas organizaciones con objetivos variados que utilizan el presupuesto del centro de alumnos para crear proyectos, los cuales también son visibles para los alumnos a través de la aplicación. Además, la plataforma difunde hacie el estudiantado eventos y noticias creados por estas organizaciones, o bien, por el mismo centro de alumnos.

#### Servicios ofrecidos

Por medio de esta plataforma, se digitaliza el sistema de préstamo de objetos ofrecido por el centro de alumnos, permitiendo llevar un registro de inventario y préstamos activos, junto con el envío automatizado de recordatorios de devolución.

También, en la plataforma se muestran todos los objetos perdidos y encontrados, permitiendo así que sean rápidamente reclamados por sus dueñes.

Por último, la plataforma posee un servicio de mensajería, permitiendo que les alumnes puedan comunicarse directamente con el centro de alumnos por medio de un canal informal.

## Modelación

Nuestra aplicación tiene una serie de entidades modeladas cuyo comportamiento se puede ver en `src/models`

Para claridad aqui se destacan las relaciones entre los distintos modelos

#### `article`

- Pertenece a una `organization` a traves de la columna `organization_id`

#### `comment`

- Pertenece a un `user` a traves de la columna `user_id`
- Pertenece a un `event` a traves de la columna `event_id`

#### `event`

- Pertenece a muches `user` a traves de la tabla `event_users`
- Pertenece a una `organization` a traves de la columna `organization_id`
- Posee muchos `comment` a traves de la columna  `event_id`

#### `inventoryItem`

- Posee muchas `reservations` a traves de la columna `inventory_item_id`

#### `lostItem`

- Puede pertenecer a un `user` a traves de la columna `user_id`

#### `message`

- Puede pertenece a un `user` a traves de la columna `user_id`
- Contiene la columna `cai_message` que es `true` si es enviado por el CAi al `user` y `false` en caso contrario

#### `organization`

- Pertenece a muches `user` a traves de la tabla `organization_members`
- Posee muchos `project` a traves de la columna `organization_id`
- Posee muchos `article` a traves de la columna `organization_id`
- Posee muchos `event` a traves de la columna `organization_id`

#### `project`

- Pertenece a una `organization` a traves de la columna `organization_id`

#### `reservation`

- Pertenece a un `user` a traves de la columna `user_id`
- Pertenece a un `inventory_item` a traves de la columna `inventory_item_id`

#### `user`

- Pertenece a muchas `organization` a traves de la tabla `organization_members`
- Pertenece a muchos `event` a traves de la tabla `event_users`
- Posee muchas `reservations` a traves de la columna `inventory_item_id`
- Puede poseer muchos `lost_item` a traves de la columna `user_id`
- Puede poseer muchos `message` a traves de la columna `user_id`
- Puede poseer muchos `comment` a traves de la columna `user_id`

## Rutas aplicación web

| Ruta                            | Método |
|---------------------------------|--------|
| /session/log-in                 | GET    |
| /session/log-in                 | POST   |
| /session/log-out                | DELETE |
| /users/profile                  | GET    |
| /users/new                      | GET    |
| /users/new                      | POST   |
| /users/edit                     | GET    |
| /users/edit                     | PATCH  |
| /users/destroy                  | DELETE |
| /organizations/                 | GET    |
| /organizations/:id/show         | GET    |
| /organizations/:id/show         | POST   |
| /organizations/:id/show         | DELETE |
| /organizations/new              | GET    |
| /organizations/new              | POST   |
| /organizations/:id/edit         | GET    |
| /organizations/:id/edit         | PATCH  |
| /organizations/:id/destroy      | DELETE |
| /inventory-items/               | GET    |
| /inventory-items/new            | GET    |
| /inventory-items/new            | POST   |
| /inventory-items/:id/edit       | GET    |
| /inventory-items/:id/edit       | PATCH  |
| /inventory-items/:id/reserve    | POST   |
| /inventory-items/:id/dereserve  | POST   |
| /inventory-items/:id/mail       | POST   |
| /inventory-items/:id/destroy    | DELETE |
| /lost-items/                    | GET    |
| /lost-items/new                 | GET    |
| /lost-items/new                 | POST   |
| /lost-items/:id/claim           | POST   |
| /lost-items/:id/unclaim         | POST   |
| /lost-items/:id/edit            | GET    |
| /lost-items/:id/edit            | PATCH  |
| /lost-items/:id/mail            | POST   |
| /lost-items/:id/destroy         | DELETE |
| /events/                        | GET    |
| /events/:id/show                | GET    |
| /events/new                     | GET    |
| /events/new                     | POST   |
| /events/:id/show                | POST   |
| /events/:id/show                | DELETE |
| /events/:id/edit                | GET    |
| /events/:id/edit                | PATCH  |
| /events/:id/destroy             | DELETE |
| /projects/                      | GET    |
| /projects/:id/show              | GET    |
| /projects/new                   | GET    |
| /projects/new                   | POST   |
| /projects/:id/edit              | GET    |
| /projects/:id/edit              | PATCH  |
| /projects/:id/destroy           | DELETE |
| /messages/                      | GET    |
| /messages/chat/anonymous        | GET    |
| /messages/chat/:id              | GET    |
| /messages/:id/show              | GET    |
| /messages/:id/show              | POST   |
| /messages/new                   | GET    |
| /messages/new                   | POST   |
| /messages/:id/edit              | PATCH  |
| /messages/:id/destroy           | DELETE |
| /articles/                      | GET    |
| /articles/:id/show              | GET    |
| /articles/new                   | GET    |
| /articles/new                   | POST   |
| /articles/:id/edit              | GET    |
| /articles/:id/edit              | PATCH  |
| /articles/:id/destroy           | DELETE |
| /dashboard/                     | GET    |
| /api/auth/login                 | POST   |
| /api/navbar/metadata            | GET    |
| /api/messages/                  | GET    |
| /api/messages/chat/anonymous    | GET    |
| /api/messages/chat/:id          | GET    |
| /api/messages/chat/:id/send     | POST   |
| /api/retrieve/:entity/:id       | GET    |
| /api/retrieve/orglist           | GET    |
| /api/retrieve/user              | GET    |
| /api/retrieve/get/comments/:id  | GET    |
| /api/retrieve/post/comments/:id | POST   |

## Set Up

Toda la información necesaria con los requerimientos y los pasos para levantar la aplicacón se encuentran en el archivo [README.md](https://github.com/IIC2513-2020-1/grupo-this/blob/master/README.md).

## Server Side

La aplicación corre en `Node.js`, se utiliza `Sequelize` como ORM, `Postgres SQL` como base de datos y `Koa-Router` como enrutador.

#### Creación y edición de entidades

En el ORM se definen las asociaciones, atributos, *properties* y *pre-build hooks* y validaciones que posee cada una de las entidades de nuestra modelación.
Como ejemplo, el modelo de la entidad usuario puede ser encontrado [aquí](https://github.com/IIC2513-2020-1/grupo-this/blob/master/src/models/user.js)

El enrutador, al momento de recibir una *request* para editar o crear una entidad, pasa por un proceso de pre-validación, independiente para cada tipo de entidad, antes de llamar a los métodos del ORM.

#### Helpers

Con el objetivo de mantener el orden y reducir el tamaño de los controladores, se crea un módulo de helpers, el cual exporta funciones útiles para las distintas entidades. Se exponen mediante el `ctx`. Un ejemplo de uso para acceder a la función `foo()` para el modelo *Inventory Items* desde su enrutador `routes/inventoryItems.js` es el siguiente:
`ctx.helpers.inventoryItems.foo()`
Este módulo se encuentra en `src/helpers`.

#### Constants

El archivo con constantes se encuentra en `src/constants.js`, ahí se pueden encontrar las constantes requeridas por el resto del proyecto tales como la duración de las sesiones o las expresiones regulares para validar ciertos campos. Utilizamos `SCREAMING_SNAKE_CASE` para referirnos a estas.

#### Subida de Imágenes

Se hostean las imágenes subidas en cloudinary. Contamos con tres servidores, uno local, otro para staging y otro para producción.

Las credenciales deben encontrarse en las variables de entosavrno y cada modelo creado que tenga imágentes debe tener el *pre-build hook* `saveImage` correctamente llamado en su modelo. Para detalles sobre esta funcion, puede ser encontrada en `src/helpers/global`

#### Permisos

Hay 5 niveles de permisos:

- Administradore

  > Puede acceder a todas las funcionalidades de la aplicación.

- CAi

  > Puede acceder a todas las funcionalidades de la aplicación, menos crear y destruir organizaciones.

- Miembre de Organización

  > Puede ocupar todas las funcionalidades de las entidades relacionadas con las organizaciones a las que pertenece.

- Usuarie Común

  > Puede comentar eventos e inscribirse a ellos, pedir cosas prestadas al CAi, reclamar objetos perdidos como suyos, y mandar mensajes al CAi.

- Usuarie No Inscrite

  > Puede ver todas las vistas publicas de la aplicación y enviar mensajes anonimos al CAi.

## Seguridad

#### Manejo de sesiones

Las sesiones de los usuarios se manejan mediante una cookie cuya duración está definida en el archivo de constantes.

En cuanto a la API, se autorizan las requests de acuerdo a un header obtenible a través de JWT, teniendo que enviar a la ruta `[POST] api/auth` un objeto con las credenciales de usuario.

## Documentación de la API

Toda la documentación de la API, junto con una pequeña aplicación para probarla se encuentra accediendo desde el navegador a la ruta `/docs` de la aplicación web. La documentación **es interactiva**, lo que quiere decir que se pueden probar los distintos _endpoints_ desde la misma documentación sin necesidad de escribir una sola línea de código (**wow**). Se utiliza SwaggerUI para renderear el spec OpenAPI de nuestra API.

## Client Side javascript

#### React

En `src/assets/js/components` se pueden encontrar componentes de react utilizados en las vistas. Algunos de estos componentes son: barra de navegación, chat y comentarios.

#### Constants

Hay otro archivo de constantes para las constantes utilizadas desde el lado del cliente. Este se encuentra en `/src/assets/js/constants.js`.

## Front End

Los estilos se encuentran en `/src/assets/styles`.

#### Framework

Si bien no se ha utilzado ningún framework de css, se ha ido creando un _pseudo framework_ con distintas clases y _helpers_ para estilar la aplicación a medida que crece. En particular, han sido de especial utilidad las clases ubicadas en `columns.scss` y `cards.scss`. La idea del _framework_ creado fue generar componentes lo más reutilizables posibles para darle a la app un mismo estilo a lo largo de todas las vistas y para disminuir el tiempo gastado en pensar en el _frontend_. También fue pensado para ser fácilmente adaptable a _mobile_, por lo que nuestra app es **totalmente responsive**.

#### Paleta de colores

Los colores utilizados principalmente en la aplicación se encuentran listados en `/src/assets/styles/base/variables.scss` y se alterna el uso de estos dependiendo del si la aplicación está en *dark mode* o *light mode*.
