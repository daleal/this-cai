const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { isMember } = require('../helpers/global');

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
  const organization = await project.getOrganization();
  const member = await isMember(organization, ctx.state.currentUser);
  const organizationPath = ctx.router.url('organizations.show', { id: organization.id });
  await ctx.render('projects/show', {
    project,
    organization,
    member,
    organizationPath,
    indexPath: () => ctx.router.url('projects.index'),
  });
});

router.get('projects.new', '/new', requireLogIn, async (ctx) => {
  const project = await ctx.orm.project.build();
  const user = ctx.state.currentUser;
  const organizations = await user.getOrganizations();
  const past = ctx.request.headers.referer;
  const pos = past.indexOf('organizations/');
  let source;
  if (pos !== -1) {
    const org = parseInt(past.charAt(pos + 14), 10);
    source = await ctx.orm.organization.findByPk(org);
  }
  await ctx.render('projects/new', {
    project,
    source,
    organizations,
  });
});

router.post('projects.create', '/new', requireLogIn, async (ctx) => {
  const project = await ctx.orm.project.build(ctx.request.body);
  const organization = await project.getOrganization();
  try {
    if (!isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
    await project.save({ fields: ['name', 'description', 'contactInfo', 'img', 'organizationId'] });
    return ctx.redirect(ctx.router.url('projects.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('projects/new', { project });
  }
});

router.get('projects.edit', '/:id/edit', requireLogIn, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  await ctx.render('projects/edit', { project });
});

router.patch('projects.update', '/:id/edit', requireLogIn, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  const organization = await project.getOrganization();
  try {
    if (!isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
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

router.delete('projects.destroy', '/:id/destroy', requireLogIn, async (ctx) => {
  const project = await ctx.orm.project.findByPk(ctx.params.id);
  const organization = await project.getOrganization();
  try {
    if (!isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    return ctx.redirect(ctx.router.url('projects.index'));
  }
  await project.destroy();
  return ctx.redirect(ctx.router.url('projects.index'));
});

module.exports = router;
