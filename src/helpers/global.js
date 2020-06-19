'use strict';

let manifest;

try {
  // eslint-disable-next-line global-require,import/no-unresolved
  manifest = require('../../build/assets/manifest.json');
} catch (err) {

  // noop
}

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadImage = async (imagePath, publicId) => {
  const response = await cloudinary.uploader.upload(imagePath, { public_id: publicId });
  return response.url;
};

module.exports = {
  name: 'global',
  saveImage: async (model) => {
    if (model.changed('img')) {
      if (fs.readFileSync(model.img).length) {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const publicID = `${model.constructor.getTableName()}/${model.id}/${timestamp}`;
        const responseURL = await uploadImage(model.img, publicID);
        model.set('img', responseURL);
      } else {
        model.set('img', null);
      }
    }
  },
  futureDate: (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  },
  isMember: async (organization, user) => {
    if (user) {
      const members = await organization.getUsers();
      return members.some((member) => user.id === member.id);
    }
    return false;
  },
  hasOrganization: async (user) => {
    if (user) {
      const organizations = await user.getOrganizations();
      return organizations.length > 0;
    }
    return false;
  },
  assetPath: (path) => (process.env.NODE_ENV !== 'development' && manifest && manifest[path]) || `/assets/${path}`,
};
