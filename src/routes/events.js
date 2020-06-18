const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
/* const { requireCAi } = require('../middleware/userPermissions'); */

const { futureDate } = require('../helpers/global');
const { EVENT_DEFAULT_TIME_LEFT, EVENT_CATEGORIES } = require('../constants');

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
  const organization = await event.getOrganization();
  await ctx.render('events/show', {
    event,
    organization,
    attendees,
    attendeesIds,
    organizationPath: () => ctx.router.url('organizations.show', { id: organization.id }),
    indexPath: () => ctx.router.url('events.index'),

  });
});

router.get('events.new', '/new', requireLogIn, async (ctx) => {
  const startDate = futureDate(EVENT_DEFAULT_TIME_LEFT);
  startDate.setMinutes(0);
  const event = await ctx.orm.event.build({ dateAndTime: startDate });
  const user = ctx.state.currentUser;
  const organizations = await user.getOrganizations();
  const past = ctx.request.headers.referer;
  const pos = past.indexOf('organizations/');
  let source;
  if (pos !== -1) {
    const org = parseInt(past.charAt(pos + 14), 10);
    source = await ctx.orm.organization.findByPk(org);
  }
  await ctx.render('events/new', {
    event,
    source,
    organizations,
    eventCategories: EVENT_CATEGORIES,
  });
});

router.post('events.create', '/new', requireLogIn, async (ctx) => {
  const event = ctx.orm.event.build(ctx.request.body);
  try {
    ctx.helpers.events.validate(ctx.request.body);
    await event.save({ fields: ['name', 'dateAndTime', 'category', 'location', 'organizationID'] });
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

router.post('events.attend', '/:id/show', requireLogIn, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  try {
    ctx.helpers.events.validateAttendance(event);
    await event.addUser(ctx.state.currentUser);
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
    ctx.helpers.events.validateAttendance(event);
    await event.removeUser(ctx.state.currentUser);
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
  }
  return ctx.redirect(ctx.router.url('events.show', event.id));
});


router.get('events.edit', '/:id/edit', requireLogIn, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await ctx.render('events/edit', {
    event,
    eventCategories: EVENT_CATEGORIES,
  });
});

router.patch('events.update', '/:id/edit', requireLogIn, async (ctx) => {
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

router.delete('events.destroy', '/:id/destroy', requireLogIn, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  await event.destroy();
  return ctx.redirect(ctx.router.url('events.index'));
});

module.exports = router;
