const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/api/sessions');
const { requiereMembership } = require('../../middleware/api/userPermissions');
const { isMember } = require('../../helpers/global');

const router = new KoaRouter();

router.get('api.articles.index', '/', async (ctx) => {
  const articles = await ctx.orm.article.findAll();
  ctx.body = articles.map(((article) => ({
    id: article.id,
    title: article.title,
    content: article.content,
  })));
});

router.get('api.articles.show', '/:id', async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  if (article) {
    ctx.body = {
      id: article.id,
      title: article.title,
      content: article.content,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Article does not exist',
    };
  }
});

router.post('api.articles.create', '/', requireLogIn, requiereMembership, async (ctx) => {
  const article = ctx.orm.article.build(ctx.request.body);
  const organization = await article.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    await article.save({ fields: ['title', 'content', 'organizationId'] });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.patch('api.articles.update', '/:id', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  const organization = await article.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    const {
      title, content, organizationId,
    } = ctx.request.body;
    await article.update({
      title, content, organizationId,
    });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.delete('api.articles.destroy', '/:id', requireLogIn, requiereMembership, async (ctx) => {
  const article = await ctx.orm.article.findByPk(ctx.params.id);
  if (article) {
    const organization = await article.getOrganization();
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    await article.destroy();
    ctx.status = 200;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Article does not exist',
    };
  }
});

module.exports = router;
