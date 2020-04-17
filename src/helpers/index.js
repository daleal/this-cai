const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

const helpers = {};

fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const helperModule = require(path.join(__dirname, file));
    const { name, ...helperObject } = helperModule;
    helpers[name] = helperObject;
  });

module.exports = helpers;
