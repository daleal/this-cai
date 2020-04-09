const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const lostItems = require('./routes/lost_items');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/lost-items', lostItems.routes());

module.exports = router;
