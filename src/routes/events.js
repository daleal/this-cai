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
  const base = new Date();
  const date = new Date(base.getFullYear(), base.getMonth() + 1, base.getDate());
  const event = await ctx.orm.event.build({ dateAndTime: date });
  await ctx.render('events/new', { event });
});

router.post('events.create', '/new', async (ctx) => {
  const event = ctx.orm.event.build(ctx.request.body);
  try {
    ctx.helpers.events.validate(ctx.request.body);
    await event.save({ fields: ['name', 'dateAndTime', 'category', 'location'] });
    return ctx.redirect(ctx.router.url('events.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('events/new', { event });
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
    return ctx.redirect(ctx.router.url('events.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('events/edit', { event });
  }
});

router.del('events.destroy', '/:id/destroy', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await event.destroy();
  return ctx.redirect(ctx.router.url('events.index'));
});

module.exports = router;
