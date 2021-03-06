const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');
const override = require('koa-override-method');
const cors = require('@koa/cors');
const cloudinary = require('cloudinary').v2;
const assets = require('./assets');
const mailer = require('./mailers');
const routes = require('./routes');
const helpers = require('./helpers');
const orm = require('./models');
const currentUser = require('./middleware/currentUser');
const currentAPIUser = require('./middleware/api/currentUser');

const { SESSION_DURATION } = require('./constants');

// Setup Cloudinary
if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({ // Use individual variables
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'cloud_name',
    api_key: process.env.CLOUDINARY_API_KEY || 'api_key',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'api_secret',
  });
}

// App constructor
const app = new Koa();

// Set up CORS
app.use(cors());

const developmentMode = app.env === 'development';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

// expose ORM through context's prototype
app.context.orm = orm;

// expose helpers through context's prototype
app.context.helpers = helpers;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// webpack middleware for dev mode only
if (developmentMode) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const koaWebpack = require('koa-webpack');
  koaWebpack()
    .then((middleware) => app.use(middleware))
    .catch(console.error); // eslint-disable-line no-console
}

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));

// expose a session hash to store information across requests from same client
app.use(session({
  key: 'SESSIONID',
  maxAge: 1000 * SESSION_DURATION,
}, app));

// flash messages support
app.use(koaFlashMessage);

// Load current user to the app state if there is one
app.use(currentUser);
app.use(currentAPIUser);

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

// Get file paths into the request body
app.use((ctx, next) => {
  if (ctx.request.files) {
    Object.keys(ctx.request.files).forEach((fileKey) => {
      ctx.request.body[fileKey] = ctx.request.files[fileKey].path;
    });
  }
  return next();
});

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});

// Configure EJS views
app.use(assets(developmentMode));
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

mailer(app);

// Routing middleware
app.use(routes.routes());

module.exports = app;
