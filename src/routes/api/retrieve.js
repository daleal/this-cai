const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/sessions');

const router = new KoaRouter();

router.get('retrieve.entityy', '/:entity/:id', async (ctx) => {
  let entityName = ctx.params.entity.slice(0, -1);

  if (entityName === 'inventory-item') {
    entityName = 'inventoryItem';
  }

  if (entityName === 'lost-item') {
    entityName = 'lostItem';
  }

  if (!(entityName in ctx.orm)) {
    return;
  }
  const instance = await ctx.orm[entityName].findByPk(ctx.params.id);
  const user = ctx.state.currentUser;
  const userOrganizations = await user.getOrganizations();
  instance.dataValues.userOrganizations = userOrganizations;
  ctx.body = instance;
});

router.get('retrieve.orgList', '/orglist', async (ctx) => {
  const user = ctx.state.currentUser;
  const userOrganizations = await user.getOrganizations();
  ctx.body = { userOrganizations };
});

router.get('retrieve.user', '/user', async (ctx) => {
  const user = ctx.state.currentUser;
  ctx.body = user;
});

router.get('retrieve.comments', '/get/comments/:id', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  const comments = await event.getComments();
  ctx.body = { comments };
});

router.post('retrieve.postComment', '/post/comments/:id', requireLogIn, async (ctx) => {
  const user = await ctx.state.currentUser;
  const eventId = ctx.params.id;
  const { content } = JSON.parse(ctx.request.body);
  const author = `${user.firstName} ${user.lastName}`;
  await ctx.orm.comment.create({
    eventId,
    userId: user.id,
    content,
    author,
  });
});

module.exports = router;
