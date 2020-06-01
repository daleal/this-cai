const KoaRouter = require('koa-router');

const { requireLogIn, requireNotLoggedIn } = require('../middleware/sessions');

const router = new KoaRouter();

router.get('session.new', '/log-in', requireNotLoggedIn, async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('session/new', {
    user,
    newUserPath: ctx.router.url('users.new'),
  });
});

router.post('session.create', '/log-in', requireNotLoggedIn, async (ctx) => {
  const { email, password } = ctx.request.body; // Get login data
  try {
    const user = await ctx.orm.user.authenticate(email, password);
    if (!user) {
      // User credentials invalid
      throw new Error('Invalid email/password combination');
    }
    // Create session and associate it to user
    const session = await ctx.orm.session.build();
    session.setUser(user);
    await session.save();
    ctx.session.id = session.id;
    return ctx.redirect('/');
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('session/new', {
      // Generate a data holder
      user: ctx.orm.user.build({ email, password }),
      newUserPath: ctx.router.url('users.new'),
    });
  }
});

router.delete('session.destroy', '/log-out', requireLogIn, async (ctx) => {
  console.log('OOF');
  const session = await ctx.orm.session.findByPk(ctx.session.id);
  session.invalidate();
  await session.save();
  ctx.session = null;
  return ctx.redirect('/');
});

module.exports = router;
