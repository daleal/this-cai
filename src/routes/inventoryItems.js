const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

const router = new KoaRouter();

router.get('inventoryItems.index', '/', async (ctx) => {
  const inventoryItems = await ctx.orm.inventoryItem.findAll();
  await ctx.render('inventoryItems/index', {
    inventoryItems,
    newPath: () => ctx.router.url('inventoryItems.new'),
    showPath: (item) => ctx.router.url('inventoryItems.show', { id: item.id }),
    editPath: (item) => ctx.router.url('inventoryItems.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('inventoryItems.destroy', { id: item.id }),
  });
});

router.get('inventoryItems.show', '/:id/show', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventoryItems/show', { inventoryItem });
});

router.get('inventoryItems.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.build();
  await ctx.render('inventoryItems/new', { inventoryItem });
});

router.post('inventoryItems.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = ctx.orm.inventoryItem.build(ctx.request.body);
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    await inventoryItem.save({ fields: ['name', 'description', 'maxStock', 'currentStock', 'img'] });
    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventoryItems/new', { inventoryItem });
  }
});

router.get('inventoryItems.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventoryItems/edit', { inventoryItem });
});

router.patch('inventoryItems.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    const {
      name, description, maxStock, currentStock, img,
    } = ctx.request.body;
    await inventoryItem.update({
      name, description, maxStock, currentStock, img,
    });
    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventoryItems/edit', { inventoryItem });
  }
});

router.delete('inventoryItems.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await inventoryItem.destroy();
  return ctx.redirect(ctx.router.url('inventoryItems.index'));
});

module.exports = router;
