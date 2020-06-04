const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

module.exports = function mailers(app) {
  const transport = nodemailer.createTransport(emailConfig.provider, emailConfig.defaults);
  // eslint-disable-next-line no-param-reassign
  app.context.sendMail = async function sendMail(emailName, options, templateContext) {
    const html = await this.render(
      `emails/${emailName}`,
      { ...templateContext, layout: false, writeResp: false },
    );
    if (process.env.NODE_ENV === 'production') {
      return transport.sendMail({ ...options, html });
    }
    // eslint-disable-next-line no-console
    console.log(`\n\nfrom: ${emailConfig.defaults.from}\n\n${html}\n\n`);
  };
};
