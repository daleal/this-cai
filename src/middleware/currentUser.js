module.exports = async (ctx, next) => {
  // Get user ID from cookies
  const { userID } = ctx.session;

  // Load the Current User to the context state if it exists
  ctx.state.currentUser = userID ? await ctx.orm.user.findByPk(userID) : null;

  await next();
};
