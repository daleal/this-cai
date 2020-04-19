const KoaRouter = require('koa-router');

const index = require('./routes/index');
const users = require('./routes/users');
const organizations = require('./routes/organizations');
const inventoryItems = require('./routes/inventory_items');
const lostItems = require('./routes/lost_items');
const events = require('./routes/events');
const projects = require('./routes/projects');
const articles = require('./routes/articles');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/users', users.routes());
router.use('/organizations', organizations.routes());
router.use('/inventory-items', inventoryItems.routes());
router.use('/lost-items', lostItems.routes());
router.use('/events', events.routes());
router.use('/projects', projects.routes());
router.use('/articles', articles.routes());


module.exports = router;
