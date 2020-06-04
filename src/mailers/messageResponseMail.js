module.exports = function messageResponseMail(ctx, response, email) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('messageResponseMail', { to: email, subject: 'Respuesta mensaje CAi' }, { response });
};
