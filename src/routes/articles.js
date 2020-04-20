const KoaRouter = require('koa-router');

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
  await ctx.render('articles/show', { article });
});

router.get('articles.new', '/new', async (ctx) => {
  await ctx.render('articles/new');
});

router.post('articles.create', '/new', async (ctx) => {
  try {
    const { title, content } = ctx.request.body;
    const article = ctx.orm.article.build({ title, content });
    await article.save({ fields: ['title', 'content'] });
    ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/new');
  }
});

router.get('articles.edit', '/:id/edit', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await ctx.render('articles/edit', { article });
});

router.patch('articles.update', '/:id/edit', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  try {
    const { title, content } = ctx.request.body;
    await article.update({ title, content });
    ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/edit', { article });
  }
});

router.del('articles.destroy', '/:id/destroy', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await article.destroy();
  ctx.redirect(ctx.router.url('articles.index'));
});

module.exports = router;
