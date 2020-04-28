const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/log-in', async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('session/new', { user });
});

router.post('session.create', '/log-in', async (ctx) => {
  const { email, password } = ctx.request.body; // Get login data
  try {
    const user = await ctx.orm.user.authenticate(email, password);
    if (!user) {
      // User credentials invalid
      throw new Error('Invalid email/password combination');
    }
    ctx.session.userID = user.id;
    ctx.redirect('/');
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('session/new', {
      // Generate a data holder
      user: ctx.orm.user.build({ email, password }),
    });
  }
});

router.delete('session.destroy', '/log-out', async (ctx) => {
  ctx.session = null;
  ctx.redirect('/');
});

module.exports = router;
