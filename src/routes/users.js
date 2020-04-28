const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users.show', '/:id/show', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await ctx.render('users/show', { user });
});

router.get('users.new', '/new', async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/new', { user });
});

router.post('users.create', '/new', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    ctx.helpers.users.validate(ctx.request.body);
    await user.save({
      fields: ['email', 'firstName', 'lastName', 'phoneNumber', 'role', 'password'],
    });
    ctx.redirect(ctx.router.url('session.new'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/new', { user });
  }
});

router.get('users.edit', '/:id/edit', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await ctx.render('users/edit', { user });
});

router.patch('users.update', '/:id/edit', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  try {
    ctx.helpers.users.validate(ctx.request.body);
    const {
      email, firstName, lastName, phoneNumber, role,
    } = ctx.request.body;
    await user.update({
      email, firstName, lastName, phoneNumber, role,
    });
    ctx.redirect(ctx.router.url('session.new'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/edit', { user });
  }
});

router.delete('users.destroy', '/:id/destroy', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await user.destroy();
  ctx.redirect(ctx.router.url('users.new'));
});

module.exports = router;
