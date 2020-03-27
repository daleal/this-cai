# CAi App

Repository for the IIC2513 project of `this` group.

## Requirements:

Simple requirements render happy developers:

- `Docker`
- `Docker Compose`

## Development

Clone repository:

```sh
git clone https://github.com/IIC2513-2020-1/grupo-this

cd grupo-this
```

Build the `Docker` image:

```sh
docker-compose build
```

Run database migrations:

```sh
docker-compose run web sequelize db:migrate
```

Run the app!

```sh
docker-compose up
```

You can now find your application at `http://localhost:3000/`

## Useful Commands

### Server Commands

To start a development server, just run:

```sh
docker-compose up
```

To stop that server, run:

```sh
docker-compose down
```

To run any command, inside the container, you can just run:

```sh
docker-compose run web <command>
```

Where `<command>` corresponds to the command you want to run inside the container (for example, in the **Development** section we migrated the database running `docker-compose run web sequelize db:migrate`, which is commanding the container to run `sequelize db:migrate`).

Note that commands that would normally run as `./node_modules/.bin/<command>` now will just need to be called with `docker-compose run web <command>`. This is due to the binaries folder of the node modules being in the `PATH` of the container image.

### Database Commands

To use the `sequelize` CLI, you just need to run:

```sh
docker-compose run web sequelize <command>
```

Where `<command>` corresponds to the command you want `sequelize` to run (for example, in the **Development** section we migrated the database running `docker-compose run web sequelize db:migrate`).

## Heroku Deployment

To deploy to `heroku` using Container Registry, make sure to be logged in to the platform (`heroku login`). Then, log in to Container Registry:

```sh
heroku container:login
```

After that, if no app has been created yet, create a new one:

```sh
heroku create
```

Don't forget to add the `heroku-postgresql` addon to your `heroku` app (when deploying to `heroku`, only the `Koa` app will be deployed, and the `postgres` container used locally must be replaced with the `heroku-postgresql` addon):

```sh
heroku addons:create heroku-postgresql:hobby-dev -a <heroku-app-name>
```

Next, build the image and push it to Container Registry:

```sh
heroku container:push web -a <heroku-app-name>
```

Finally, release the image to your app:

```sh
heroku container:release web -a <heroku-app-name>
```

**Important Note**: Once your app is created, to push new changes you **only** have to run `heroku container:push web -a <heroku-app-name>` and then `heroku container:release web -a <heroku-app-name>`.

To open the app in a browser, you can run `heroku open`. You can also access directly using the app's URL.
