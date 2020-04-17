const KoaRouter = require('koa-router');

const router = new KoaRouter();

function validateStock(max, current) {
  if (max < 0 || current < 0 || max < current) {
    throw new Error('Invalid stock values');
  }
}
router.get('inventory_items.index', '/', async (ctx) => {
  const inventoryItems = await ctx.orm.inventoryItem.findAll();
  await ctx.render('inventory_items/index', {
    inventoryItems,
    showPath: (item) => ctx.router.url('inventory_items.show', { id: item.id }),
    newPath: () => ctx.router.url('inventory_items.new'),
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
  const inventoryItem = ctx.orm.inventoryItem.build(ctx.request.body);
  try {
    validateStock(ctx.request.body.maxStock, ctx.request.body.currentStock);
    await inventoryItem.save({ fields: ['name', 'description', 'maxStock', 'currentStock'] });
    ctx.redirect(ctx.router.url('inventory_items.index'));
  } catch (validationError) {
    await ctx.render('inventory_items/new', {
      inventoryItem,
      errors: validationError,
    });
  }
});

router.get('inventory_items.edit', '/:id/edit', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventory_items/edit', { inventoryItem });
});

router.patch('inventory_items.update', '/:id/edit', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);

  try {
    const {
      name, description, maxStock, currentStock,
    } = ctx.request.body;
    await inventoryItem.update({
      name, description, maxStock, currentStock,
    });
    ctx.redirect(ctx.router.url('inventory_items.index'));
  } catch (validationError) {
    await ctx.render('inventory_items/edit', {
      inventoryItem,
      errors: validationError.errors,
    });
  }
});

router.del('inventory_items.destroy', '/:id/destroy', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await inventoryItem.destroy();
  ctx.redirect(ctx.router.url('inventory_items.index'));
});


module.exports = router;
