module.exports = function pickupMail(ctx, { lostItem, user }, email) {
  return ctx.sendMail(
    'pickupMail',
    { to: email, subject: 'Objeto Reclamado' },
    { lostItem, user },
  );
};
