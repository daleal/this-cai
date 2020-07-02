const KoaRouter = require('koa-router');

const { InvalidCredentialsError } = require('../../errors');

const router = new KoaRouter();

router.post('api.auth.login', '/login', async (ctx) => {
  try {
    const { email, password } = ctx.request.body; // Get login data
    const user = await ctx.orm.user.authenticate(email, password);
    if (!user) {
      // User credentials invalid
      throw new InvalidCredentialsError('Invalid email/password combination');
    }
    const token = ctx.helpers.jwt.generate(user.id);
    ctx.body = {
      email: user.email,
      token,
    };
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      ctx.status = 401;
    } else {
      ctx.status = 500;
    }
    ctx.body = { message: error.message };
  }
});


module.exports = router;
