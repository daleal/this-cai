const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

const router = new KoaRouter();

router.get('articles.index', '/', async (ctx) => {
  const articles = await ctx.orm.article.findAll();
  await ctx.render('articles/index', {
    articles,
    newPath: () => ctx.router.url('articles.new'),
    showPath: (article) => ctx.router.url('articles.show', { id: article.id }),
    editPath: (article) => ctx.router.url('articles.edit', { id: article.id }),
    deletePath: (article) => ctx.router.url('articles.destroy', { id: article.id }),
  });
});

router.get('articles.show', '/:id/show', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await ctx.render('articles/show', {
    article,
    indexPath: () => ctx.router.url('articles.index'),
  });
});

router.get('articles.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const article = await ctx.orm.article.build();
  await ctx.render('articles/new', { article });
});

router.post('articles.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const article = ctx.orm.article.build(ctx.request.body);
  try {
    await article.save({ fields: ['title', 'content'] });
    return ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/new', { article });
  }
});

router.get('articles.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await ctx.render('articles/edit', { article });
});

router.patch('articles.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  try {
    const { title, content } = ctx.request.body;
    await article.update({ title, content });
    return ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/edit', { article });
  }
});

router.delete('articles.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await article.destroy();
  return ctx.redirect(ctx.router.url('articles.index'));
});

module.exports = router;
