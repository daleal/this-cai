const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('organizations.index', '/', async (ctx) => {
  const organizations = await ctx.orm.organizations.findAll();
  await ctx.render('organizations/index', {
    organizations,
    showPath: (organization) => ctx.router.url('organizations.show', { id: organization.id }),
    newPath: () => ctx.router.url('organizations.new'),
    deletePath: (organization) => ctx.router.url('organizations.destroy', { id: organization.id }),
  });
});

router.get('organizations.show', '/:id/show', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await ctx.render('organizations/show', { organization });
});

router.get('organizations.new', '/new', async (ctx) => {
  await ctx.render('organizations/new');
});

router.post('organizations.create', '/new', async (ctx) => {
  const organization = ctx.orm.organization.build({
    name: ctx.request.body.name,
    description: ctx.request.body.description,
  });
  try {
    await organization.save({ fields: ['name', 'description'] });
    ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    await ctx.render('organizations/new', {
      organization,
      errors: validationError.errors,
    });
  }
});

router.get('organizations.edit', '/:id/edit', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await ctx.render('organizations/edit', { organization });
});

router.patch('organizations.update', '/:id/edit', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  try {
    const { name, description } = ctx.request.body;
    await organization.update({ name, description });
    ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    await ctx.render('organizations/edit', {
      organization,
      errors: validationError.errors,
    });
  }
});

router.delete('organizations.destroy', '/:id/destroy', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await organization.destroy();
  ctx.redirect(ctx.router.url('organizations.index'));
});

module.exports = router;
