const KoaRouter = require('koa-router');

const { requireLogIn } = require('../../middleware/api/sessions');
const { requiereMembership } = require('../../middleware/api/userPermissions');
const { isMember } = require('../../helpers/global');

const router = new KoaRouter();

router.get('api.events.index', '/', async (ctx) => {
  const events = await ctx.orm.event.findAll();
  ctx.body = events;
});

router.get('api.events.show', '/:id', async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  if (event) {
    ctx.body = event;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Event does not exist',
    };
  }
});

router.post('api.events.create', '/', requireLogIn, requiereMembership, async (ctx) => {
  const event = ctx.orm.event.build(ctx.request.body);
  const organization = await event.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    await event.save({ fields: ['name', 'dateAndTime', 'category', 'location', 'organizationId'] });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
});

router.patch('api.events.update', '/:id', requireLogIn, requiereMembership, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  const organization = await event.getOrganization();
  try {
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    const {
      name, dateAndTime, category, location,
    } = ctx.request.body;
    await event.update({
      name, dateAndTime, category, location,
    });
    ctx.status = 200;
  } catch (errors) {
    ctx.status = 500;
    if (Array.isArray(errors)) {
      ctx.body = { message: errors.map((error) => error.message).join(', ') };
    } else {
      ctx.body = { message: errors.message };
    }
  }
});

router.delete('api.events.destroy', '/:id', requireLogIn, requiereMembership, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  if (event) {
    const organization = await event.getOrganization();
    if (!await isMember(organization, ctx.state.currentAPIUser)) {
      ctx.status = 403;
      ctx.body = { message: 'Special permission is required' };
      return;
    }
    await event.destroy();
    ctx.status = 200;
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Event does not exist',
    };
  }
});


// Attendance

router.post('api.events.attend', '/:id/attendance', requireLogIn, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  try {
    ctx.helpers.events.validateAttendance(event);
    await event.addUser(ctx.state.currentAPIUser);
  } catch (errors) {
    ctx.status = 500;
    if (Array.isArray(errors)) {
      ctx.body = { message: errors.map((error) => error.message).join(', ') };
    } else {
      ctx.body = { message: errors.message };
    }
  }
});

router.delete('api.events.unattend', '/:id/attendance', requireLogIn, async (ctx) => {
  const event = await ctx.orm.event.findByPk(ctx.params.id);
  try {
    ctx.helpers.events.validateAttendance(event);
    await event.removeUser(ctx.state.currentUser);
  } catch (errors) {
    ctx.status = 500;
    if (Array.isArray(errors)) {
      ctx.body = { message: errors.map((error) => error.message).join(', ') };
    } else {
      ctx.body = { message: errors.message };
    }
  }
});

module.exports = router;
