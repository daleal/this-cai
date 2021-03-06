const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');
const pickupMail = require('../mailers/pickupMail');

const router = new KoaRouter();

router.get('lostItems.index', '/', async (ctx) => {
  const lostItems = await ctx.orm.lostItem.findAll();
  const users = await ctx.orm.user.findAll();
  const userNameHash = ctx.helpers.lostItems.userIdToName(users);
  await ctx.render('lostItems/index', {
    lostItems,
    userNameHash,
    newPath: () => ctx.router.url('lostItems.new'),
    editPath: (item) => ctx.router.url('lostItems.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('lostItems.destroy', { id: item.id }),
    claimPath: (item) => ctx.router.url('lostItems.claim', { id: item.id }),
    unclaimPath: (item) => ctx.router.url('lostItems.unclaim', { id: item.id }),
    mailerPath: (item) => ctx.router.url('lostItems.mailer', { id: item.id }),

  });
});


router.get('lostItems.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.build();
  await ctx.render('lostItems/new', { lostItem });
});

router.post('lostItems.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.build(ctx.request.body);
  try {
    await lostItem.save({ fields: ['description', 'taken', 'img', 'locationFound'] });
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lostItems/new', { lostItem });
  }
});
router.post('lostItems.claim', '/:id/claim', requireLogIn, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  try {
    ctx.helpers.lostItems.validateNotTaken(lostItem);
    await lostItem.update({ taken: true });
    await lostItem.setUser(ctx.state.currentUser);
    ctx.state.flashMessage.success = 'Objeto reclamado ¡Ve a buscarlo al CAi!';
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    return ctx.redirect(ctx.router.url('lostItems.index'));
  }
});

router.post('lostItems.unclaim', '/:id/unclaim', requireLogIn, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  try {
    ctx.helpers.lostItems.validateOwnership(ctx.state.currentUser, lostItem);
    await lostItem.update({ taken: false, user_id: null });
    ctx.state.flashMessage.success = 'Objeto liberado para que lo reclame su verdadero dueño :)';
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    return ctx.redirect(ctx.router.url('lostItems.index'));
  }
});
router.get('lostItems.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await ctx.render('lostItems/edit', { lostItem });
});

router.patch('lostItems.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  try {
    const { description, img, locationFound } = ctx.request.body;
    await lostItem.update({ description, img, locationFound });
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (validationError) {
    ctx.state.flashMessage.danger = validationError.message;
    await ctx.render('lostItems/edit', { lostItem });
  }
});

router.post('lostItems.mailer', '/:id/mail', requireLogIn, requireCAi, async (ctx) => {
  try {
    const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
    const user = await ctx.orm.user.findByPk(lostItem.userId);
    await pickupMail(ctx, { lostItem, user }, user.email);
    ctx.state.flashMessage.success = 'Correo enviado';
    return ctx.redirect(ctx.router.url('lostItems.index'));
  } catch (sendingErrors) {
    ctx.state.flashMessage.danger = sendingErrors.message;
    return ctx.redirect(ctx.router.url('lostItems.index'));
  }
});

router.delete('lostItems.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const lostItem = await ctx.orm.lostItem.findByPk(ctx.params.id);
  await lostItem.destroy();
  return ctx.redirect(ctx.router.url('lostItems.index'));
});


module.exports = router;
