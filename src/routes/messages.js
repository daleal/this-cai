const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('messages.index', '/', async (ctx) => {
  const messages = await ctx.orm.message.findAll();
  await ctx.render('messages/index', {
    messages,
    showPath: (message) => ctx.router.url('messages.show', { id: message.id }),
    editPath: (message) => ctx.router.url('messages.edit', { id: message.id }),
    newPath: () => ctx.router.url('messages.new'),
    deletePath: (message) => ctx.router.url('messages.destroy', { id: message.id }),
  });
});


router.get('messages.show', '/:id/show', async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  await ctx.render('messages/show', { message });
});

router.get('messages.new', '/new', async (ctx) => {
  await ctx.render('messages/new');
});

router.post('messages.create', '/new', async (ctx) => {
  const message = ctx.orm.message.build(ctx.request.body);
  try {
    ctx.helpers.messages.validate(ctx.request.body);
    await message.save({ fields: ['content', 'email'] });
    ctx.redirect(ctx.router.url('messages.index'));
  } catch (validationErrors) {
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('messages/new', {
      message,
    });
  }
});

router.get('messages.edit', '/:id/edit', async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  await ctx.render('messages/edit', { message });
});

router.patch('messages.update', '/:id/edit', async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);

  try {
    ctx.helpers.messages.validate(ctx.request.body);
    const {
      content, email,
    } = ctx.request.body;
    await message.update({
      content, email,
    });
    ctx.redirect(ctx.router.url('messages.index'));
  } catch (validationErrors) {
    const arrayMessages = validationErrors.map((error) => error.message);
    ctx.state.flashMessage.danger = `Error: ${arrayMessages.join(', ')}`;
    await ctx.render('messages/edit', {
      message,
    });
  }
});

router.del('messages.destroy', '/:id/destroy', async (ctx) => {
  const message = await ctx.orm.message.findByPk(ctx.params.id);
  await message.destroy();
  ctx.redirect(ctx.router.url('messages.index'));
});


module.exports = router;
