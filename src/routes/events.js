const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('events.index', '/', async (ctx) => {
  const events = await ctx.orm.event.findAll();
  await ctx.render('events/index', {
    events,
    newPath: () => ctx.router.url('events.new'),
    showPath: (event) => ctx.router.url('events.show', { id: event.id }),
    editPath: (event) => ctx.router.url('events.edit', { id: event.id }),
    deletePath: (event) => ctx.router.url('events.destroy', { id: event.id }),
  });
});

router.get('events.show', '/:id/show', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await ctx.render('events/show', { event });
});

router.get('events.new', '/new', async (ctx) => {
  await ctx.render('events/new');
});

router.post('events.create', '/new', async (ctx) => {
  try {
    ctx.helpers.events.validate(ctx.request.body);
    const {
      name, dateAndTime, category, location,
    } = ctx.request.body;
    const event = ctx.orm.event.build({
      name, dateAndTime, category, location,
    });
    await event.save({ fields: ['name', 'dateAndTime', 'category', 'location'] });
    ctx.redirect(ctx.router.url('events.index'));
  } catch (validationErrors) {
    ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    await ctx.render('events/new');
  }
});

router.get('events.edit', '/:id/edit', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await ctx.render('events/edit', { event });
});

router.patch('events.update', '/:id/edit', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);

  try {
    ctx.helpers.events.validate(ctx.request.body);
    const {
      name, dateAndTime, category, location,
    } = ctx.request.body;
    await event.update({
      name, dateAndTime, category, location,
    });
    ctx.redirect(ctx.router.url('events.index'));
  } catch (validationErrors) {
    ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    await ctx.render('events/edit', { event });
  }
});

router.del('events.destroy', '/:id/destroy', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await event.destroy();
  ctx.redirect(ctx.router.url('events.index'));
});

module.exports = router;
