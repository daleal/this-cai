const KoaRouter = require('koa-router');

const auth = require('./auth');
const navbar = require('./navbar');
const cookieMessages = require('./cookieMessages');
const getter = require('./retrieve');

const organizations = require('./organizations');
const articles = require('./articles');
const events = require('./events');
const chats = require('./chats');

const router = new KoaRouter();


// Cookie-based authenticated endpoints
router.use('/navbar', navbar.routes());
router.use('/messages/cookies', cookieMessages.routes());
router.use('/retrieve', getter.routes());

// API
router.use('/auth', auth.routes());
router.use('/organizations', organizations.routes());
router.use('/articles', articles.routes());
router.use('/events', events.routes());
router.use('/chats', chats.routes());

module.exports = router;
