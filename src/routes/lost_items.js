const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('lost_items.index', '/', async (ctx) => {
  const lostItems = await ctx.orm.LostItem.findAll();
  await ctx.render('lost_items/index', { lostItems });
});

router.get('lost_items.show', '/:id/show', async (ctx) => {
  const lostItem = await ctx.orm.LostItem.findByPk(ctx.params.id);
  await ctx.render('lost_items/show', { lostItem });
});

router.get('lost_items.new', '/new', async (ctx) => {
  await ctx.render('lost_items/new');
});

router.post('lost_items.create', '/new', async (ctx) => {
  lostItem = ctx.orm.LostItem.build({
    description: ctx.request.body.description,
    taken: false
  });
  await lostItem.save();
  ctx.redirect('/lost_items');
});

router.get('lost_items.edit', '/:id/edit', async (ctx) => {
  const lostItem = await ctx.orm.LostItem.findByPk(ctx.params.id);
  await ctx.render('lost_items/edit', { lostItem });
});

// Change to PATCH
router.post('lost_items.update', '/:id/edit', async (ctx) => {
  const lostItem = await ctx.orm.LostItem.findByPk(ctx.params.id);
  lostItem.description = ctx.request.body.description;
  await lostItem.save({ fields: ['description'] });
  console.log(lostItem);
  ctx.redirect('/lost_items');
});

// Change to DELETE
router.post('lost_items.destroy', '/:id/destroy', async (ctx) => {
  const lostItem = await ctx.orm.LostItem.findByPk(ctx.params.id);
  await lostItem.destroy();
  ctx.redirect('/lost_items');
});

module.exports = router;
