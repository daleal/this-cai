module.exports = function sendDueDateMail(ctx, { user }, { item }) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('dueDateMail', { to: user.email, subject: 'Recordatorio prestamo' }, { item });
};
