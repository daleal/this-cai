const KoaRouter = require('koa-router');

const { requireLogIn } = require('../middleware/sessions');
const { requireCAi } = require('../middleware/userPermissions');

const router = new KoaRouter();

router.get('dashboard.info', '/', requireLogIn, requireCAi, async (ctx) => {
  const reservations = await ctx.orm.reservation.findAll();
  const unopenedMessages = await ctx.orm.message.findAll({
    where: { opened: 'false' },
    include: ctx.orm.user,
  });

  const reservationsArray = await ctx.helpers.dashboard.reservationZipper(reservations);

  await ctx.render('dashboard', {
    reservationsArray,
    dereservePath: (item) => ctx.router.url('inventoryItems.dereserve', { id: item.id }),
    mailerPath: (item) => ctx.router.url('inventoryItems.mailer', { id: item.id }),
    unopenedMessages,
    messageShowPath: (message) => ctx.router.url('messages.show', { id: message.id }),
  });
});

module.exports = router;
