'use strict';

const cloudinary = require('cloudinary').v2;

async function uploadImage (image, modelName, id) {
  const res = await cloudinary.uploader.upload(image.path, { public_id: `${modelName}/${id}/${Math.floor(new Date().getTime() / 1000)}` });
  return res.url;
}

function setupCloudinary(enviroment) {
  // CLOUDINARY_URL not present outside heroku
  if (!enviroment.CLOUDINARY_URL) {
    // for local debugging we manually set cloudinary config
    // (not the same cloudinary host than production one which remains secret)

    cloudinary.config({
      cloud_name: 'grupothislocal',
      api_key: '246683733479268',
      api_secret: 'RS2vVqdc1zkxIj3e88wFeoIDfmI',
    });
  }
}

module.exports = {
  name: 'images',
  setupCloudinary,
  uploadImage,
  getImageUrl: (modelName, id) => cloudinary.url(`${modelName}/${id}`),
  uploadAndSave: async (image, enviroment, modelName, modelInstance) => {
    if (image.size) {
      const instance = modelInstance;
      setupCloudinary(enviroment);
      const url = await uploadImage(image, modelName, modelInstance.id);
      instance.img = url;
      await instance.save({ fields: ['img'] });
    }
  },

};
