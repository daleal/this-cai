const requireCAi = async (ctx, next) => {
  // Assume user has already been checked to exist
  if (!ctx.state.currentAPIUser.isCAi) {
    ctx.status = 403;
    ctx.body = { message: 'Special permission is required' };
    return;
  }

  await next();
};

const requireAdministrator = async (ctx, next) => {
  // Assume user has already been checked to exist
  if (!ctx.state.currentAPIUser.isAdministrator) {
    ctx.status = 403;
    ctx.body = { message: 'Special permission is required' };
    return;
  }

  await next();
};

const requiereMembership = async (ctx, next) => {
  const organizations = await ctx.state.currentAPIUser.getOrganizations();
  if (!ctx.state.currentAPIUser.isCAi && organizations.length === 0) {
    ctx.status = 403;
    ctx.body = { message: 'Special permission is required' };
    return;
  }

  await next();
};

module.exports = { requireCAi, requireAdministrator, requiereMembership };
