const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/api/sessions');
const { requireCAi, requireAdministrator } = require('../../middleware/api/userPermissions');
const { isMember } = require('../../helpers/global');

const router = new KoaRouter();

router.get('api.organizations.index', '/', async(ctx) => {
  const organizations = await ctx.orm.organization.findAll();
  ctx.body = organizations.map(((organization) => ({
    id: organization.id,
    name: organization.name,
    description: organization.description,
  })));
});

router.get('api.organizations.show', '/:id', async(ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  if (organization) {
    ctx.body = {
      id: organization.id,
      name: organization.name,
      description: organization.description,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Organization does not exist',
    };
  }
});

router.post('api.organizations.create', '/', requireLogIn, requireAdministrator, async (ctx) => {
  const organization = await ctx.orm.organization.build(ctx.request.body);
  try {
    await organization.save({ fields: ['name', 'description'] });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.patch('api.organizations.update', '/:id', requireLogIn, requireCAi, async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  try {
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    const { name, description } = ctx.request.body;
    await organization.update({ name, description });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.delete('api.organizations.destroy', '/:id', requireLogIn, requireAdministrator, async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  if (organization) {
    await organization.destroy();
    ctx.status = 200;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Organization does not exist',
    };
  }
});

module.exports = router;
