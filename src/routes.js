const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const inventoryItems = require('./routes/inventory_items');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/inventory-items', inventoryItems.routes());
module.exports = router;
