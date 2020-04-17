const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('projects.index', '/', async (ctx) => {
  const projects = await ctx.orm.project.findAll();
  await ctx.render('projects/index', {
    projects,
    showPath: (project) => ctx.router.url('projects.show', { id: project.id }),
    newPath: () => ctx.router.url('projects.new'),
    deletePath: (project) => ctx.router.url('projects.destroy', { id: project.id }),
  });
});

router.get('projects.show', '/:id/show', async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await ctx.render('projects/show', { project });
});

router.get('projects.new', '/new', async (ctx) => {
  await ctx.render('projects/new');
});

router.post('projects.create', '/new', async (ctx) => {
  const project = ctx.orm.project.build(ctx.request.body);
  try {
    await project.save({ fields: ['name', 'description', 'contactInfo'] });
    ctx.redirect(ctx.router.url('projects.index'));
  } catch (validationError) {
    await ctx.render('projects/new', {
      project,
      errors: validationError.errors,
    });
  }
});

router.get('projects.edit', '/:id/edit', async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await ctx.render('projects/edit', { project });
});

router.patch('projects.update', '/:id/edit', async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);

  try {
    const {
      name, description, contactInfo,
    } = ctx.request.body;
    await project.update({
      name, description, contactInfo,
    });
    ctx.redirect(ctx.router.url('projects.index'));
  } catch (validationError) {
    await ctx.render('projects/edit', {
      project,
      errors: validationError.errors,
    });
  }
});

router.del('projects.destroy', '/:id/destroy', async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await project.destroy();
  ctx.redirect(ctx.router.url('projects.index'));
});


module.exports = router;
