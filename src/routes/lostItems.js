const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

const router = new KoaRouter();

router.get('lostItems.index', '/', async (ctx) => {
  const lostItems = await ctx.orm.lostItem.findAll();
  await ctx.render('lostItems/index', {
    lostItems,
    newPath: () => ctx.router.url('lostItems.new'),
    showPath: (item) => ctx.router.url('lostItems.show', { id: item.id }),
    editPath: (item) => ctx.router.url('lostItems.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('lostItems.destroy', { id: item.id }),
  });
});

router.get('lostItems.show', '/:id/show', async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await ctx.render('lostItems/show', { lostItem });
});

router.get('lostItems.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.build();
  await ctx.render('lostItems/new', { lostItem });
});

router.post('lostItems.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.build(ctx.request.body);
  try {
    await lostItem.save({ fields: ['description', 'taken', 'img'] });
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lostItems/new', { lostItem });
  }
});

router.get('lostItems.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await ctx.render('lostItems/edit', { lostItem });
});

router.patch('lostItems.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  try {
    const { description, img } = ctx.request.body;
    await lostItem.update({ description, img });
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lostItems/edit', { lostItem });
  }
});

router.delete('lostItems.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await lostItem.destroy();
  return ctx.redirect(ctx.router.url('lostItems.index'));
});

module.exports = router;
