const models = require('../../models');
const helpers = require('../../helpers');

module.exports = async (ctx, next) => {
  ctx.state.currentAPIUser = null;

  // Get data from JWT
  const authString = ctx.header.authorization;

  if (authString) {
    // Get JWT from auth string
    const jwt = authString.replace('Bearer ', '');

    // Decode the JWT
    const payload = helpers.jwt.decode(jwt);

    if (payload) {
      const { id } = payload;
      ctx.state.currentAPIUser = await models.user.findByPk(id);
    }
  }

  await next();
};
