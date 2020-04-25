const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('inventory_items.index', '/', async (ctx) => {
  const inventoryItems = await ctx.orm.inventoryItem.findAll();
  await ctx.render('inventory_items/index', {
    inventoryItems,
    newPath: () => ctx.router.url('inventory_items.new'),
    showPath: (item) => ctx.router.url('inventory_items.show', { id: item.id }),
    editPath: (item) => ctx.router.url('inventory_items.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('inventory_items.destroy', { id: item.id }),
  });
});

router.get('inventory_items.show', '/:id/show', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventory_items/show', { inventoryItem });
});

router.get('inventory_items.new', '/new', async (ctx) => {
  await ctx.render('inventory_items/new');
});

router.post('inventory_items.create', '/new', async (ctx) => {
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    const {
      name, description, maxStock, currentStock,
    } = ctx.request.body;
    const inventoryItem = ctx.orm.inventoryItem.build({
      name, description, maxStock, currentStock,
    });
    await inventoryItem.save({ fields: ['name', 'description', 'maxStock', 'currentStock'] });
    ctx.redirect(ctx.router.url('inventory_items.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventory_items/new');
  }
});

router.get('inventory_items.edit', '/:id/edit', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventory_items/edit', { inventoryItem });
});

router.patch('inventory_items.update', '/:id/edit', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    const {
      name, description, maxStock, currentStock,
    } = ctx.request.body;
    await inventoryItem.update({
      name, description, maxStock, currentStock,
    });
    ctx.redirect(ctx.router.url('inventory_items.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventory_items/edit', { inventoryItem });
  }
});

router.del('inventory_items.destroy', '/:id/destroy', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await inventoryItem.destroy();
  ctx.redirect(ctx.router.url('inventory_items.index'));
});

module.exports = router;
