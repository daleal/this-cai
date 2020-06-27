const KoaRouter = require('koa-router');

const auth = require('./auth');
const navbar = require('./navbar');
const messages = require('./messages');
const getter = require('./retrieve');

const router = new KoaRouter();

router.use('/auth', auth.routes());
router.use('/navbar', navbar.routes());
router.use('/messages', messages.routes());
router.use('/retrieve', getter.routes());

module.exports = router;
