const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('organizations.index', '/', async (ctx) => {
  const organizations = await ctx.orm.organization.findAll();
  await ctx.render('organizations/index', {
    organizations,
    newPath: () => ctx.router.url('organizations.new'),
    showPath: (organization) => ctx.router.url('organizations.show', { id: organization.id }),
    editPath: (organization) => ctx.router.url('organizations.edit', { id: organization.id }),
    deletePath: (organization) => ctx.router.url('organizations.destroy', { id: organization.id }),
  });
});

router.get('organizations.show', '/:id/show', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await ctx.render('organizations/show', { organization });
});

router.get('organizations.new', '/new', async (ctx) => {
  const organization = await ctx.orm.organization.build();
  await ctx.render('organizations/new', { organization });
});

router.post('organizations.create', '/new', async (ctx) => {
  const organization = await ctx.orm.organization.build(ctx.request.body);
  try {
    await organization.save({ fields: ['name', 'description', 'img'] });
    await ctx.helpers.images.uploadAndSave(
      ctx.request.files.image,
      process.env,
      'organizations',
      organization,
    );
    return ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('organizations/new', { organization });
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
    await ctx.helpers.images.uploadAndSave(
      ctx.request.files.image,
      process.env,
      'organizations',
      organization,
    );
    return ctx.redirect(ctx.router.url('organizations.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('organizations/edit', { organization });
  }
});

router.delete('organizations.destroy', '/:id/destroy', async (ctx) => {
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  await organization.destroy();
  return ctx.redirect(ctx.router.url('organizations.index'));
});

module.exports = router;
