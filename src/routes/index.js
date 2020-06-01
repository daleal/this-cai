const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  if (ctx.state.currentUser.isCAi) {
    return ctx.redirect(ctx.router.url('dashboard.info'));
  }
  let articles = await ctx.orm.article.findAll();
  articles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  articles = articles.slice(0, 4);
  let events = await ctx.orm.event.findAll();
  events.sort((a, b) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime());
  events = events.slice(0, 4);
  await ctx.render('index', {
    appVersion: pkg.version,
    articles,
    events,
    showArticlePath: (article) => ctx.router.url('articles.show', { id: article.id }),
    showEventPath: (event) => ctx.router.url('events.show', { id: event.id }),
  });
});

module.exports = router;
