const KoaRouter = require('koa-router');

const navbar = require('./navbar');
const messages = require('./messages');

const router = new KoaRouter();

router.use('/navbar', navbar.routes());
router.use('/messages', messages.routes());

module.exports = router;
