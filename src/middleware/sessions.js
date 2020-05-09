const requireLogIn = async (ctx, next) => {
  if (!ctx.state.currentUser) {
    ctx.state.flashMessage.notice = 'Inicia sesión para acceder a esa página';
    return ctx.redirect(ctx.router.url('session.new'));
  }

  await next();
};

const requireNotLoggedIn = async (ctx, next) => {
  if (ctx.state.currentUser) {
    ctx.state.flashMessage.notice = 'Ya has iniciado sesión!';
    return ctx.redirect('/');
  }

  await next();
};

module.exports = { requireLogIn, requireNotLoggedIn };
