"use strict";

const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('articles.index', '/', async (ctx) => {
  const articles = await ctx.orm.article.findAll();
  await ctx.render('articles/index', {
    articles,
    deletePath: (article) => ctx.router.url('articles.destroy', { id: article.id }),
    newPath: (article) => ctx.router.url('articles.new'),
    showPath: (article) => ctx.router.url('article.show', {id: article.id}),
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
  const article = ctx.orm.article.build(ctx.request.body);
  try {
    await article.save({ fields: ['title', 'content'] });
    ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    await ctx.render('articles/new', {
      article,
      errors: validationError.errors,
    });
  }
});

router.get('articles.edit', '/:id/edit', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await ctx.render('articles/edit', { article });
});

router.patch('articles.update', '/:id/edit', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);

  try {
    const {
      title, content,
    } = ctx.request.body;
    await article.update({
      title, content,
    });
    ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    await ctx.render('articles/edit', {
      article,
      errors: validationError.errors,
    });
  }
});

router.del('articles.destroy', '/:id/destroy', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await article.destroy();
  ctx.redirect(ctx.router.url('articles.index'));
});


module.exports = router;
