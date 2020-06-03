module.exports = function sendResponseMail(ctx, { response }, email) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('responseMail', { to: email, subject: 'respuesta CAi' }, { response });
};
