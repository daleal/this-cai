const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('events.index', '/', async (ctx) => {
  const events = await ctx.orm.event.findAll();
  await ctx.render('events/index', {
    events,
    showPath: (event) => ctx.router.url('events.show', { id: event.id }),
    newPath: () => ctx.router.url('events.new'),
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
  const event = ctx.orm.event.build(ctx.request.body);
  try {
    ctx.helpers.events.validate(ctx.request.body);
    await event.save({ fields: ['name', 'dateAndTime', 'category', 'location'] });
    ctx.redirect(ctx.router.url('events.index'));
  } catch (validationErrors) {
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('events/new', {
      event,
    });
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
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('events/edit', {
      event,
    });
  }
});

router.del('events.destroy', '/:id/destroy', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await event.destroy();
  ctx.redirect(ctx.router.url('events.index'));
});


module.exports = router;
