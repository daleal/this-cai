const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('users.index', '/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  await ctx.render('users/index', {
    users,
    showPath: (user) => ctx.router.url('users.show', { id: user.id }),
    editPath: (user) => ctx.router.url('users.edit', { id: user.id }),
    newPath: () => ctx.router.url('users.new'),
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
  const user = ctx.orm.user.build({
    email: ctx.request.body.email,
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    phoneNumber: ctx.request.body.phoneNumber,
    role: ctx.request.body.role,
  });
  try {
    ctx.helpers.users.validate(ctx.request.body);
    await user.save({
      fields: ['email', 'firstName', 'lastName', 'phoneNumber', 'role'],
    });
    ctx.redirect(ctx.router.url('users.index'));
  } catch (validationErrors) {
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('users/new', {
      user,
    });
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
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('users/edit', {
      user,
    });
  }
});

router.delete('users.destroy', '/:id/destroy', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  await user.destroy();
  ctx.redirect(ctx.router.url('users.index'));
});

module.exports = router;
