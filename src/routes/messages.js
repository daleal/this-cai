const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');

const router = new KoaRouter();

router.get('messages.index', '/', requireLogIn, async (ctx) => {
  if (ctx.state.currentUser.isCAi) {
    const messages = await ctx.orm.message.findAll();
    const personal = await ctx.orm.message.findAll({ where: { userId: ctx.state.currentUser.id } });
    await ctx.render('messages/index', {
      messages,
      personal,
      newPath: () => ctx.router.url('messages.new'),
      showPath: (message) => ctx.router.url('messages.show', { id: message.id }),
      editPath: (message) => ctx.router.url('messages.edit', { id: message.id }),
      deletePath: (message) => ctx.router.url('messages.destroy', { id: message.id }),
    });
  } else {
    const personal = await ctx.orm.message.findAll({ where: { userId: ctx.state.currentUser.id } });
    await ctx.render('messages/index', {
      personal,
      newPath: () => ctx.router.url('messages.new'),
      showPath: (message) => ctx.router.url('messages.show', { id: message.id }),
      editPath: (message) => ctx.router.url('messages.edit', { id: message.id }),
      deletePath: (message) => ctx.router.url('messages.destroy', { id: message.id }),
    });
  }
});

router.get('messages.show', '/:id/show', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  const user = await ctx.orm.user.findByPk(message.userId);
  if (ctx.state.currentUser.isCAi) {
    await ctx.render('messages/show', { message, user });
  } else if (ctx.state.currentUser.id === user.id) {
    await ctx.render('messages/show', { message, user });
  }
});

router.get('messages.new', '/new', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.build();
  await ctx.render('messages/new', { message });
});

router.post('messages.create', '/new', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.build(ctx.request.body);
  try {
    message.userId = ctx.state.currentUser.id;
    await message.save();
    ctx.helpers.messages.validate(ctx.request.body);
    await message.save({ fields: ['content', 'email'] });
    return ctx.redirect(ctx.router.url('messages.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('messages/new', { message });
  }
});

router.get('messages.edit', '/:id/edit', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  await ctx.render('messages/edit', { message });
});

router.patch('messages.update', '/:id/edit', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  try {
    ctx.helpers.messages.validate(ctx.request.body);
    const { content, email } = ctx.request.body;
    await message.update({ content, email });
    return ctx.redirect(ctx.router.url('messages.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('messages/edit', { message });
  }
});

router.delete('messages.destroy', '/:id/destroy', requireLogIn, async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  await message.destroy();
  return ctx.redirect(ctx.router.url('messages.index'));
});

module.exports = router;
