const KoaRouter = require('koa-router');

const router = new KoaRouter();

const navbarMetadata = require('../../content/navbar');

router.get('navbar.metadata', '/metadata', async (ctx) => {
  ctx.body = {
    logoItem: navbarMetadata.logo,
    colorModeItem: navbarMetadata.colorMode,
    menuItem: navbarMetadata.menu,
    navItems: [
      navbarMetadata.organizations,
      navbarMetadata.projects,
      navbarMetadata.events,
      navbarMetadata.articles,
      navbarMetadata.inventoryItems,
      navbarMetadata.lostItems,
    ],
  };
  if (!ctx.state.currentUser) {
    ctx.body.navItems = ctx.body.navItems.concat([
      navbarMetadata.newMessage,
      navbarMetadata.logIn,
    ]);
  } else {
    if (ctx.state.currentUser.isCAi) {
      const unopenedMessages = await ctx.orm.message.count({
        where: {
          opened: 'false',
        },
      });
      ctx.body.navItems = ctx.body.navItems.concat([
        {
          ...navbarMetadata.messages,
          notifications: unopenedMessages,
        },
      ]);
    } else {
      ctx.body.navItems = ctx.body.navItems.concat([
        navbarMetadata.messages,
      ]);
    }
    ctx.body.navItems = ctx.body.navItems.concat([
      navbarMetadata.profile,
      navbarMetadata.logOut,
    ]);
  }
});

module.exports = router;
