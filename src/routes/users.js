const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users.index', '/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  await ctx.render('users/index', {
    users,
    newPath: () => ctx.router.url('users.new'),
    showPath: (user) => ctx.router.url('users.show', { id: user.id }),
    editPath: (user) => ctx.router.url('users.edit', { id: user.id }),
    deletePath: (user) => ctx.router.url('users.destroy', { id: user.id }),
  });
});

router.get('users.show', '/:id/show', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await ctx.render('users/show', { user });
});

router.get('users.new', '/new', async (ctx) => {
  await ctx.render('users/new');
});

router.post('users.create', '/new', async (ctx) => {
  try {
    ctx.helpers.users.validate(ctx.request.body);
    const {
      email, firstName, lastName, phoneNumber, role,
    } = ctx.request.body;
    const user = ctx.orm.user.build({
      email, firstName, lastName, phoneNumber, role,
    });
    await user.save({
      fields: ['email', 'firstName', 'lastName', 'phoneNumber', 'role'],
    });
    ctx.redirect(ctx.router.url('users.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('users/new');
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
    ctx.redirect(ctx.router.url('users.index'));
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
  ctx.redirect(ctx.router.url('users.index'));
});

module.exports = router;
