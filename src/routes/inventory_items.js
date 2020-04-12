const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('inventory_items.index', '/', async (ctx) => {
  const inventoryItems = await ctx.orm.inventoryItem.findAll();
  await ctx.render('inventory_items/index', {
    inventoryItems,
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
    await inventoryItem.save({ fields: ['name', 'description', 'maxStock', 'currentStock'] });
    ctx.redirect('/inventory-items');
  } catch (validationError) {
    await ctx.render('inventory_items.new', {
      inventoryItem,
      errors: validationError.errors,
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
    ctx.redirect('/inventory-items');
  } catch (validationError) {
    await ctx.render('inventory_items.edit', {
      inventoryItem,
      errors: validationError.errors,
    });
  }
});

router.del('inventory_items.destroy', '/:id/destroy', async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await inventoryItem.destroy();
  ctx.redirect('/inventory-items');
});


module.exports = router;
