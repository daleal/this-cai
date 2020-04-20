const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('lost_items.index', '/', async (ctx) => {
  const lostItems = await ctx.orm.lostItem.findAll();
  await ctx.render('lost_items/index', {
    lostItems,
    newPath: () => ctx.router.url('lost_items.new'),
    showPath: (item) => ctx.router.url('lost_items.show', { id: item.id }),
    editPath: (item) => ctx.router.url('lost_items.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('lost_items.destroy', { id: item.id }),
  });
});

router.get('lost_items.show', '/:id/show', async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await ctx.render('lost_items/show', { lostItem });
});

router.get('lost_items.new', '/new', async (ctx) => {
  await ctx.render('lost_items/new');
});

router.post('lost_items.create', '/new', async (ctx) => {
  try {
    const { description } = ctx.request.body;
    const lostItem = ctx.orm.lostItem.build({ description, taken: false });
    await lostItem.save({ fields: ['description', 'taken'] });
    ctx.redirect(ctx.router.url('lost_items.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lost_items/new');
  }
});

router.get('lost_items.edit', '/:id/edit', async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await ctx.render('lost_items/edit', { lostItem });
});

router.patch('lost_items.update', '/:id/edit', async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  try {
    const { description } = ctx.request.body;
    await lostItem.update({ description });
    ctx.redirect(ctx.router.url('lost_items.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lost_items/edit', { lostItem });
  }
});

router.delete('lost_items.destroy', '/:id/destroy', async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await lostItem.destroy();
  ctx.redirect(ctx.router.url('lost_items.index'));
});

module.exports = router;
