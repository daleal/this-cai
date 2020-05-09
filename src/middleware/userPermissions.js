const requireCAi = async (ctx, next) => {
  // Assume user has already been checked to exist
  if (!ctx.state.currentUser.isCAi) {
    ctx.state.flashMessage.warning = 'No tienes permiso para ejecutar la acción';
    return ctx.redirect('/');
  }

  await next();
};

const requireAdministrator = async (ctx, next) => {
  // Assume user has already been checked to exist
  if (!ctx.state.currentUser.isAdministrator) {
    ctx.state.flashMessage.warning = 'No tienes permiso para ejecutar la acción';
    return ctx.redirect('/');
  }

  await next();
};

module.exports = { requireCAi, requireAdministrator };
