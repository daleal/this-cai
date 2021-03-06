const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requiereMembership } = require('../middleware/userPermissions');

const { isMember, hasOrganization } = require('../helpers/global');

const router = new KoaRouter();

router.get('articles.index', '/', async (ctx) => {
  const articles = await ctx.orm.article.findAll();
  const member = await hasOrganization(ctx.state.currentUser);
  await ctx.render('articles/index', {
    member,
    articles,
    hasOrganization,
    newPath: () => ctx.router.url('articles.new'),
    showPath: (article) => ctx.router.url('articles.show', { id: article.id }),
    editPath: (article) => ctx.router.url('articles.edit', { id: article.id }),
    deletePath: (article) => ctx.router.url('articles.destroy', { id: article.id }),
  });
});

router.get('articles.show', '/:id/show', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  const organization = await article.getOrganization();
  const member = await isMember(organization, ctx.state.currentUser);
  await ctx.render('articles/show', {
    article,
    member,
    organization,
    organizationPath: () => ctx.router.url('organizations.show', { id: organization.id }),
    indexPath: () => ctx.router.url('articles.index'),
    editPath: () => ctx.router.url('articles.edit', { id: article.id }),
  });
});

router.get('articles.new', '/new', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.build();
  const user = ctx.state.currentUser;
  const organizations = await user.getOrganizations();
  const past = ctx.request.headers.referer;
  const pos = past.indexOf('organizations/');
  let source;
  if (pos !== -1) {
    const org = parseInt(past.charAt(pos + 14), 10);
    source = await ctx.orm.organization.findByPk(org);
  }
  await ctx.render('articles/new', {
    article,
    source,
    organizations,
  });
});

router.post('articles.create', '/new', requireLogIn, requiereMembership, async (ctx) => {
  const article = ctx.orm.article.build(ctx.request.body);
  const organization = await article.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
    await article.save({ fields: ['title', 'content', 'organizationId', 'img'] });
    return ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/new', { article });
  }
});

router.get('articles.edit', '/:id/edit', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  await ctx.render('articles/edit', { article });
});

router.patch('articles.update', '/:id/edit', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  const organization = await article.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
    const {
      title, content, img, organizationId,
    } = ctx.request.body;
    await article.update({
      title, content, img, organizationId,
    });
    return ctx.redirect(ctx.router.url('articles.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('articles/edit', { article });
  }
});

router.delete('articles.destroy', '/:id/destroy', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  const organization = await article.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentUser)) {
      throw new Error('No eres miembre de esta organización');
    }
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    return ctx.redirect(ctx.router.url('articles.index'));
  }
  await article.destroy();
  return ctx.redirect(ctx.router.url('articles.index'));
});

module.exports = router;
