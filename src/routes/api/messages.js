const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/sessions');
const { requireCAi } = require('../../middleware/userPermissions');

const { assetPath } = require('../../helpers/global');
const { QUESTION_MARK_IMAGE } = require('../../constants');

const router = new KoaRouter();

router.get('api.messages.index', '/', requireLogIn, requireCAi, async (ctx) => {
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

  ctx.body = {
    users: filteredUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    })),
    anonymous: {
      url: '/messages/chat/anonymous',
      image: assetPath(QUESTION_MARK_IMAGE),
      text: 'Mensajes Anónimos',
    },
  };
});

router.get('api.messages.anonymous', '/chat/anonymous', requireLogIn, requireCAi, async (ctx) => {
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

  ctx.body = {
    anonymous: messages.map((message) => ({
      id: message.id,
      content: message.content,
    })),
  };
});

router.get('api.messages.chat', '/chat/:id', requireLogIn, async (ctx) => {
  const { id } = ctx.params;
  if (!ctx.state.currentUser.isCAi && (ctx.state.currentUser.id.toString() !== id)) {
    ctx.state.flashMessage.warning = 'No tienes permisos para acceder a esa página!';
    return ctx.redirect(ctx.router.url(('messages.index')));
  }
  if (ctx.state.currentUser.isCAi && (ctx.state.currentUser.id.toString() === id)) {
    ctx.state.flashMessage.warning = 'No puedes entrar a tu propio chat!';
    return ctx.redirect(ctx.router.url(('messages.index')));
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

  if (ctx.state.currentUser.isCAi) {
    await Promise.all(messages.map((message) => message.update({ opened: true })));
  }

  ctx.body = {
    messages: messages.map((message) => ({
      id: message.id,
      content: message.content,
      caiMessage: message.caiMessage,
    })),
  };
});

router.post('api.messages.send', '/chat/:id/send', requireLogIn, async (ctx) => {
  const { id } = ctx.params;
  if (!ctx.state.currentUser.isCAi && (ctx.state.currentUser.id.toString() !== id)) {
    ctx.state.flashMessage.warning = 'No tienes permisos para acceder a esa página!';
    return ctx.redirect(ctx.router.url(('messages.index')));
  }
  if (ctx.state.currentUser.isCAi && (ctx.state.currentUser.id.toString() === id)) {
    ctx.state.flashMessage.warning = 'No puedes enviarte un mensaje a ti mismo!';
    return ctx.redirect(ctx.router.url(('messages.index')));
  }

  try {
    const message = await ctx.orm.message.build(JSON.parse(ctx.request.body));
    await message.save({ fields: ['content'] });
    message.caiMessage = ctx.state.currentUser.isCAi;
    message.userId = id;
    if (ctx.state.currentUser.isCAi) {
      message.opened = true;
    } else {
      message.opened = false;
    }
    await message.save();
    ctx.body = {
      message: {
        id: message.id,
        content: message.content,
        caiMessage: message.caiMessage,
      },
    };
  } catch (error) {
    ctx.body = {
      error: error.message,
    };
  }
});

router.get('');

module.exports = router;
