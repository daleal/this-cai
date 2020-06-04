const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');
const { futureDate } = require('../helpers/global');
const dueDateMail = require('../mailers/dueDateMail');
const { INVENTORY_ITEM_RESERVATION_TIME } = require('../constants');

const router = new KoaRouter();

router.get('inventoryItems.index', '/', async (ctx) => {
  const inventoryItems = await ctx.orm.inventoryItem.findAll();
  await ctx.render('inventoryItems/index', {
    inventoryItems,
    newPath: () => ctx.router.url('inventoryItems.new'),
    editPath: (item) => ctx.router.url('inventoryItems.edit', { id: item.id }),
    deletePath: (item) => ctx.router.url('inventoryItems.destroy', { id: item.id }),
    reservePath: (item) => ctx.router.url('inventoryItems.reserve', { id: item.id }),
  });
});


router.get('inventoryItems.new', '/new', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.build();
  await ctx.render('inventoryItems/new', { inventoryItem });
});

router.post('inventoryItems.create', '/new', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = ctx.orm.inventoryItem.build(ctx.request.body);
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    await inventoryItem.save({ fields: ['name', 'description', 'maxStock', 'currentStock', 'img'] });
    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventoryItems/new', { inventoryItem });
  }
});

router.get('inventoryItems.edit', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await ctx.render('inventoryItems/edit', { inventoryItem });
});

router.patch('inventoryItems.update', '/:id/edit', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  try {
    ctx.helpers.inventoryItems.validate(ctx.request.body);
    const {
      name, description, maxStock, currentStock, img,
    } = ctx.request.body;
    await inventoryItem.update({
      name, description, maxStock, currentStock, img,
    });
    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    await ctx.render('inventoryItems/edit', { inventoryItem });
  }
});

router.post('inventoryItems.reserve', '/:id/reserve', requireLogIn, async (ctx) => {
  try {
    const dueDate = futureDate(INVENTORY_ITEM_RESERVATION_TIME);
    const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
    ctx.helpers.inventoryItems.consistentDecrement(inventoryItem);

    const reservation = await ctx.orm.reservation.create({ dueDate });
    await ctx.state.currentUser.addReservation(reservation);
    await inventoryItem.addReservation(reservation);
    ctx.state.flashMessage.success = 'Objeto reservado';

    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    return ctx.redirect(ctx.router.url('inventoryItems.index'));
  }
});

router.post('inventoryItems.dereserve', '/:id/dereserve', requireLogIn, requireCAi, async (ctx) => {
  try {
    const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
    const reservation = await ctx.orm.reservation.findByPk(ctx.request.body.reservationId);
    await reservation.destroy();
    await inventoryItem.increment('currentStock', { by: 1 });

    ctx.state.flashMessage.success = 'Objeto devuelto, stock actualizado';

    return ctx.redirect(ctx.router.url('dashboard.info'));
  } catch (validationErrors) {
    if (Array.isArray(validationErrors)) {
      ctx.state.flashMessage.danger = validationErrors.map((error) => error.message);
    } else {
      ctx.state.flashMessage.danger = validationErrors.message;
    }
    return ctx.redirect(ctx.router.url('dashboard.info'));
  }
});

router.post('inventoryItems.mailer', '/:id/mail', requireLogIn, requireCAi, async (ctx) => {
  try {
    const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
    const reservation = await ctx.orm.reservation.findByPk(ctx.request.body.reservationId);
    const user = await ctx.orm.user.findByPk(reservation.userId);
    await dueDateMail(ctx, { inventoryItem, reservation }, user.email);
    ctx.state.flashMessage.success = 'Correo enviado';
    return ctx.redirect(ctx.router.url('dashboard.info'));
  } catch (sendingErrors) {
    ctx.state.flashMessage.danger = sendingErrors.message;
  }
});

router.delete('inventoryItems.destroy', '/:id/destroy', requireLogIn, requireCAi, async (ctx) => {
  const inventoryItem = await ctx.orm.inventoryItem.findByPk(ctx.params.id);
  await inventoryItem.destroy();
  return ctx.redirect(ctx.router.url('inventoryItems.index'));
});

module.exports = router;
