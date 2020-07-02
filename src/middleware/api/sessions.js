const requireLogIn = async (ctx, next) => {
  if (!ctx.state.currentAPIUser) {
    ctx.status = 401;
    ctx.body = { message: 'Login is required' };
    return;
  }

  await next();
};


module.exports = { requireLogIn };
