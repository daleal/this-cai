const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi, requireAdministrator } = require('../middleware/userPermissions');

const router = new KoaRouter();

router.get('organizations.index', '/', async(ctx) => {
  const organizations = await ctx.orm.organization.findAll();

  await ctx.render('organizations/index', {
    organizations,
    newPath: () => ctx.router.url('organizations.new'),
    showPath: (organization) => ctx.router.url('organizations.show', { id: organization.id }),
  });
});

router.get('organizations.show', '/:id/show', async(ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  const users = await organization.getUsers();
  const projects = await organization.getProjects();
  await ctx.render('organizations/show', {
    organization,
    users,
    projects,
    projectPath: (project) => ctx.router.url('projects.show', { id: project.id }),
  });
});


router.get('organizations.new', '/new', requireLogIn, requireAdministrator, async (ctx) => {
  const organization = await ctx.orm.organization.build();
  await ctx.render('organizations/new', { organization });
});


router.post('organizations.create', '/new', requireLogIn, requireAdministrator, async (ctx) => {
  const organization = await ctx.orm.organization.build(ctx.request.body);
  try {
    await organization.save({ fields: ['name', 'description', 'img'] });
    return ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('organizations/new', { organization });
  }
});


router.get('organizations.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await ctx.render('organizations/edit', { organization });
});


router.patch('organizations.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  try {
    const { name, description, img } = ctx.request.body;
    await organization.update({ name, description, img });
    return ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('organizations/edit', { organization });
  }
});

router.delete('organizations.destroy', '/:id/destroy', requireLogIn, requireAdministrator, async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await organization.destroy();
  return ctx.redirect(ctx.router.url('organizations.index'));
});

module.exports = router;
