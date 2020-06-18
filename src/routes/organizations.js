const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi, requireAdministrator } = require('../middleware/userPermissions');
const { isMember } = require('../helpers/global');

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
  const events = await organization.getEvents();
  const articles = await organization.getArticles();
  const member = await isMember(organization, ctx.state.currentUser);
  await ctx.render('organizations/show', {
    organization,
    users,
    projects,
    events,
    articles,
    member,
    projectPath: (project) => ctx.router.url('projects.show', { id: project.id }),
    newProjectPath: () => ctx.router.url('projects.new'),
    eventPath: (event) => ctx.router.url('events.show', { id: event.id }),
    newEventPath: () => ctx.router.url('events.new'),
    articlePath: (article) => ctx.router.url('articles.show', { id: article.id }),
    newArticlePath: () => ctx.router.url('articles.new'),
    indexPath: () => ctx.router.url('organizations.index'),
  });
});


router.post('organizations.addMembers', '/:id/show', async(ctx) => {
  const response = ctx.request.body;
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  const users = await ctx.orm.user.findAll();
  try {
    const user = users.find((element) => element.email === response.email);
    if (isMember(organization, user)) {
      throw new Error('Ya es miembre');
    }
    organization.addUser(user);
    ctx.flashMessage.success = 'Miembre agregade';
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
  }
  return ctx.redirect(ctx.router.url('organizations.show', organization.id));
});


router.del('organizations.removeMembers', '/:id/show', async(ctx) => {
  const response = ctx.request.body;
  const organization = await ctx.orm.organization.findByPk(ctx.params.id);
  const user = await ctx.orm.user.findByPk(response.id);
  try {
    if (!isMember(organization, user)) {
      throw new Error('No es miembre');
    }
    await organization.removeUser(user);
    ctx.state.flashMessage.success = 'Miembre eliminade';
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
  }
  ctx.redirect(ctx.router.url('organizations.show', organization.id));
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
    if (!isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
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
