module.exports = async (ctx, next) => {
  ctx.state.currentUser = null;

  // Get session ID from cookies
  const { id: sessionID } = ctx.session;

  if (sessionID) {
    const session = await ctx.orm.session.findByPk(sessionID, { include: ctx.orm.user });
    if (session && session.isValid() && session.userId) {
      ctx.state.currentUser = session.user;
    } else {
      ctx.session = null;
      ctx.state.flashMessage.warning = 'Ha ocurrido un error. Por favor, inicia sesión nuevamente.';
    }
  }

  await next();
};
