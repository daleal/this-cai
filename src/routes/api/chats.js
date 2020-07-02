const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/api/sessions');
const { requireCAi } = require('../../middleware/api/userPermissions');

const router = new KoaRouter();

router.get('api.chats.index', '/', requireLogIn, requireCAi, async (ctx) => {
  const users = await ctx.orm.user.findAll({ include: ctx.orm.message });

  const filteredUsers = users.filter((user) => user.messages.length > 0);

  filteredUsers.sort((a, b) => {
    const aCreatedAt = a.messages[a.messages.length - 1].createdAt;
    const bCreatedAt = b.messages[b.messages.length - 1].createdAt;

    if (aCreatedAt < bCreatedAt) {
      return 1;
    } if (aCreatedAt > bCreatedAt) {
      return -1;
    }
    return 0;
  });

  ctx.body = filteredUsers.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
  }));
});

router.get('api.chats.anonymous', '/anonymous', requireLogIn, requireCAi, async (ctx) => {
  const messages = await ctx.orm.message.findAll({
    where: {
      userId: null,
    },
  });

  messages.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  });

  ctx.body = messages.map((message) => ({
    id: message.id,
    content: message.content,
  }));
});

router.get('api.chats.show', '/:id', requireLogIn, async (ctx) => {
  const { id } = ctx.params;
  if (!ctx.state.currentAPIUser.isCAi && (ctx.state.currentAPIUser.id.toString() !== id)) {
    ctx.status = 403;
    ctx.body = { message: 'Error accessing the resource' };
    return;
  }
  if (ctx.state.currentAPIUser.isCAi && (ctx.state.currentAPIUser.id.toString() === id)) {
    ctx.status = 403;
    ctx.body = { message: 'Error accessing the resource' };
    return;
  }

  const messages = await ctx.orm.message.findAll({
    where: {
      userId: id,
    },
  });

  messages.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    } if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });

  if (ctx.state.currentAPIUser.isCAi) {
    await Promise.all(messages.map((message) => message.update({ opened: true })));
  }

  ctx.body = messages.map((message) => ({
    id: message.id,
    content: message.content,
    caiMessage: message.caiMessage,
  }));
});

router.post('api.chats.send', '/:id', requireLogIn, async (ctx) => {
  const { id } = ctx.params;
  if (!ctx.state.currentAPIUser.isCAi && (ctx.state.currentAPIUser.id.toString() !== id)) {
    ctx.status = 403;
    ctx.body = { message: 'Error accessing the resource' };
    return;
  }
  if (ctx.state.currentAPIUser.isCAi && (ctx.state.currentAPIUser.id.toString() === id)) {
    ctx.status = 403;
    ctx.body = { message: 'Error accessing the resource' };
    return;
  }

  try {
    const message = await ctx.orm.message.build(ctx.request.body);
    await message.save({ fields: ['content'] });
    message.caiMessage = ctx.state.currentAPIUser.isCAi;
    message.userId = id;
    if (ctx.state.currentAPIUser.isCAi) {
      message.opened = true;
    } else {
      message.opened = false;
    }
    await message.save();
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: error.message,
    };
  }
});

module.exports = router;
