const KoaRouter = require('koa-router');

const { requireLogIn, requireNotLoggedIn } = require('../middleware/sessions');

const router = new KoaRouter();

router.get('users.show', '/profile', requireLogIn, async (ctx) => {
  const user = await ctx.state.currentUser;
  const events = await user.getEvents();
  const organizations = await user.getOrganizations();
  const pastEvents = events.filter((event) => ctx.helpers.events.isPast(event));
  const upcomingEvents = events.filter((event) => !ctx.helpers.events.isPast(event));
  await ctx.render('users/show', {
    user,
    pastEvents,
    upcomingEvents,
    organizations,
    eventPath: (event) => ctx.router.url('events.show', { id: event.id }),
    orgPath: (org) => ctx.router.url('organizations.show', { id: org.id }),
    editPath: ctx.router.url('users.edit'),
  });
});

router.get('users.new', '/new', requireNotLoggedIn, async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/new', {
    user,
    logInPath: ctx.router.url('session.new'),
  });
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
    await ctx.render('users/new', {
      user,
      logInPath: ctx.router.url('session.new'),
    });
  }
});

router.get('users.edit', '/edit', requireLogIn, async (ctx) => {
  await ctx.render('users/edit', {});
});

router.patch('users.update', '/edit', requireLogIn, async (ctx) => {
  const user = ctx.state.currentUser;
  try {
    ctx.helpers.users.validate(ctx.request.body);
    const {
      email, firstName, lastName, phoneNumber, img,
    } = ctx.request.body;
    await user.update({
      email, firstName, lastName, phoneNumber, img,
    });
    return ctx.redirect(ctx.router.url('users.show'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/edit', {});
  }
});

router.delete('users.destroy', '/destroy', requireLogIn, async (ctx) => {
  const user = ctx.state.currentUser;
  await user.destroy();
  return ctx.redirect(ctx.router.url('users.new'));
});

module.exports = router;
