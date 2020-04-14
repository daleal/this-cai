const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const inventoryItems = require('./routes/inventory_items');
const lostItems = require('./routes/lost_items');
const projects = require('./routes/projects');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/inventory-items', inventoryItems.routes());
router.use('/lost-items', lostItems.routes());
router.use('/projects', projects.routes());
module.exports = router;
