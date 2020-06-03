const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

const router = new KoaRouter();


router.get('projects.index', '/', async (ctx) => {
  const projects = await ctx.orm.project.findAll();

  await ctx.render('projects/index', {
    projects,
    newPath: () => ctx.router.url('projects.new'),
    showPath: (project) => ctx.router.url('projects.show', { id: project.id }),
  });
});

router.get('projects.show', '/:id/show', async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  const organization = await ctx.orm.organization.findByPk(project.organizationId);
  const organizationPath = ctx.router.url('organizations.show', { id: organization.id });
  await ctx.render('projects/show', {
    project,
    organization,
    organizationPath,
<<<<<<< HEAD
    indexPath: () => ctx.router.url('projects.index'),
=======
>>>>>>> connected the page further
  });
});

router.get('projects.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const project = await ctx.orm.project.build();
  await ctx.render('projects/new', { project });
});

router.post('projects.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const project = await ctx.orm.project.build(ctx.request.body);
  try {
    await project.save({ fields: ['name', 'description', 'contactInfo', 'img'] });
    return ctx.redirect(ctx.router.url('projects.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('projects/new', { project });
  }
});

router.get('projects.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await ctx.render('projects/edit', { project });
});

router.patch('projects.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  try {
    const {
      name, description, contactInfo, img,
    } = ctx.request.body;
    await project.update({
      name, description, contactInfo, img,
    });
    return ctx.redirect(ctx.router.url('projects.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('projects/edit', { project });
  }
});

router.delete('projects.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await project.destroy();
  return ctx.redirect(ctx.router.url('projects.index'));
});

module.exports = router;
