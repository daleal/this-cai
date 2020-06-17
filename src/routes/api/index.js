const KoaRouter = require('koa-router');

const navbar = require('./navbar');

const router = new KoaRouter();

router.use('/navbar', navbar.routes());

module.exports = router;
