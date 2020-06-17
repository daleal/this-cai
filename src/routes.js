const KoaRouter = require('koa-router');

const index = require('./routes/index');
const users = require('./routes/users');
const session = require('./routes/session');
const organizations = require('./routes/organizations');
const inventoryItems = require('./routes/inventoryItems');
const lostItems = require('./routes/lostItems');
const events = require('./routes/events');
const projects = require('./routes/projects');
const messages = require('./routes/messages');
const articles = require('./routes/articles');
const dashboard = require('./routes/dashboard');

const api = require('./routes/api');


const router = new KoaRouter();

router.use('/', index.routes());
router.use('/session', session.routes());
router.use('/users', users.routes());
router.use('/organizations', organizations.routes());
router.use('/inventory-items', inventoryItems.routes());
router.use('/lost-items', lostItems.routes());
router.use('/events', events.routes());
router.use('/projects', projects.routes());
router.use('/messages', messages.routes());
router.use('/articles', articles.routes());
router.use('/dashboard', dashboard.routes());

router.use('/api', api.routes());

module.exports = router;
