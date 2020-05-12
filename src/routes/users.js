const KoaRouter = require('koa-router');

const { requireLogIn, requireNotLoggedIn } = require('../middleware/sessions');

const router = new KoaRouter();

router.get('users.show', '/:id/show', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  const events = await user.getEvents();
  const orgs = await user.getOrganizations();
  const orgRows = ctx.helpers.global.columnator(orgs, 2);
  const pastEvents = events.filter((event) => ctx.helpers.events.isPast(event));
  const upcomingEvents = events.filter((event) => !ctx.helpers.events.isPast(event));
  const pastEventsRows = ctx.helpers.global.columnator(pastEvents, 2);
  const upcomingEventsRows = ctx.helpers.global.columnator(upcomingEvents, 2);
  const messages = await user.getMessages();
  await ctx.render('users/show', {
    user,
    pastEventsRows,
    upcomingEventsRows,
    orgRows,
    messages,
    eventPath: (event) => ctx.router.url('events.show', { id: event.id }),
    orgPath: (org) => ctx.router.url('organizations.show', { id: org.id }),
  });
});

router.get('users.new', '/new', requireNotLoggedIn, async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/new', { user });
});

router.post('users.create', '/new', requireNotLoggedIn, async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    ctx.helpers.users.validate(ctx.request.body);
    await user.save({
      fields: ['email', 'firstName', 'lastName', 'phoneNumber', 'role', 'password', 'img'],
    });
    return ctx.redirect(ctx.router.url('session.new'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/new', { user });
  }
});

router.get('users.edit', '/:id/edit', requireLogIn, async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await ctx.render('users/edit', { user });
});

router.patch('users.update', '/:id/edit', requireLogIn, async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  try {
    ctx.helpers.users.validate(ctx.request.body);
    const {
      email, firstName, lastName, phoneNumber, role, img,
    } = ctx.request.body;
    await user.update({
      email, firstName, lastName, phoneNumber, role, img,
    });
    return ctx.redirect(ctx.router.url('session.new'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/edit', { user });
  }
});

router.delete('users.destroy', '/:id/destroy', requireLogIn, async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await user.destroy();
  return ctx.redirect(ctx.router.url('users.new'));
});

module.exports = router;
