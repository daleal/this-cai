const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

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
  const attendees = await event.getUsers();
  const attendeesIds = attendees.map((user) => user.id);
  await ctx.render('events/show', {
    event,
    attendees,
    attendeesIds,
  });
});

router.get('events.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const base = new Date();
  const date = new Date(base.getFullYear(), base.getMonth() + 1, base.getDate());
  const event = await ctx.orm.event.build({ dateAndTime: date });
  await ctx.render('events/new', { event });
});

router.post('events.create', '/new', requireLogIn, requireCAi, async (ctx) => {
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

router.post('events.attend', '/:id/show', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  try {
    if (ctx.state.currentUser) {
      ctx.helpers.events.validateAttendance(event);
      await event.addUser(ctx.state.currentUser);
    } else {
      throw new Error('Inicia sesión para asistir a este evento');
    }
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
  }
  return ctx.redirect(ctx.router.url('events.show', event.id));
});

router.del('events.unattend', '/:id/show', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  try {
    if (ctx.state.currentUser) {
      ctx.helpers.events.validateAttendance(event);
      await event.removeUser(ctx.state.currentUser);
    } else {
      throw new Error('Inicia sesión para realizar los cambios');
    }
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
  }
  return ctx.redirect(ctx.router.url('events.show', event.id));
});


router.get('events.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await ctx.render('events/edit', { event });
});

router.patch('events.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
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

router.delete('events.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await event.destroy();
  return ctx.redirect(ctx.router.url('events.index'));
});

module.exports = router;
