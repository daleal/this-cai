const KoaRouter = require('koa-router');

const router = new KoaRouter();


router.get('retrieve.entity', '/:entity/:id', async (ctx) => {
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
module.exports = router;
