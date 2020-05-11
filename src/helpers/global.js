'use strict';

let manifest;

try {
  // eslint-disable-next-line global-require,import/no-unresolved
  manifest = require('../../build/assets/manifest.json');
} catch (err) {

  // noop
}

const cloudinary = require('cloudinary').v2;

const uploadImage = async (imagePath, publicId) => {
  const response = await cloudinary.uploader.upload(imagePath, { public_id: publicId });
  return response.url;
};

module.exports = {
  name: 'global',
  saveImage: async (model) => {
    if (model.changed('img')) {
      const timestamp = Math.floor(new Date().getTime() / 1000);
      const publicID = `${model.constructor.getTableName()}/${model.id}/${timestamp}`;
      const responseURL = await uploadImage(model.img, publicID);
      model.set('img', responseURL);
    }
  },
  assetPath: (path) => (process.env.NODE_ENV !== 'development' && manifest && manifest[path]) || `/assets/${path}`,
};