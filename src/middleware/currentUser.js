module.exports = async (ctx, next) => {
  ctx.state.currentUser = null;

  // Get session ID from cookies
  const { id: sessionID } = ctx.session;

  if (sessionID) {
    const session = await ctx.orm.session.findByPk(sessionID, { include: ctx.orm.user });
    if (session.isValid() && session.userId) {
      ctx.state.currentUser = session.user;
    }
  }

  await next();
};
