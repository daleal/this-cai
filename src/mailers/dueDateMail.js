module.exports = function dueDateMail(ctx, { inventoryItem, reservation }, email) {
  return ctx.sendMail(
    'dueDateMail',
    { to: email, subject: 'Recordatorio préstamo' },
    { inventoryItem, reservation },
  );
};
