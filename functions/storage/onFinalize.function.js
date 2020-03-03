const { storage } = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const { tmpdir } = require('os');
const { join, dirname } = require('path');
const sharp = require('sharp');
const fs = require('fs-extra');

const gcs = new Storage();

export default storage.object().onFinalize(async object => {
  if (!object.contentType.includes('image')) {
    console.log('Uploaded file is not an image');
    return;
  }

  if (object.metadata && object.metadata.resizedImage === 'true') {
    console.log('Image already resized');
    return;
  }

  const bucket = gcs.bucket(object.bucket);
  const filePath = object.name;
  const bucketFile = bucket.file(filePath);
  const fileName = filePath.split('/').pop();
  const bucketDir = dirname(filePath);

  const workingDir = join(tmpdir(), 'temp');
  const tempFilePath = join(workingDir, 'source.png');

  await fs.ensureDir(workingDir);

  try {
    console.log('Downloading file from bucket');
    await bucketFile.download({
      destination: tempFilePath
    });
    await bucketFile.delete();
    console.log('Finished downloading file from bucket');
  } catch (error) {
    console.log('Error while downloading file from bucket', error);
  }

  try {
    console.log('Deleting old file from bucket');
    await bucketFile.delete();
    console.log('Deleted old file from bucket');
  } catch (error) {
    console.log('Error while deleting old file from bucket', error);
  }

  const sizes = [200];

  const uploadPromises = sizes.map(async size => {
    const resizedName = fileName;
    const resizedPath = join(workingDir, resizedName);

    console.log(`Resizing image ${resizedName}`);
    await sharp(tempFilePath)
      .resize(size, size)
      .toFile(resizedPath);
    console.log(`Resized image ${resizedName}`);

    return bucket.upload(resizedPath, {
      destination: join(bucketDir, resizedName),
      metadata: {
        metadata: {
          resizedImage: true
        }
      },
      public: true
    });
  });

  try {
    console.log('Resizing/uploading images to bucket');
    await Promise.all(uploadPromises);
    console.log('Uploaded resized images to bucket');
  } catch (error) {
    console.log('Error while resizing/uploading images to bucket', error);
  }

  const cleaningPromises = [fs.remove(workingDir)];

  await Promise.all(cleaningPromises);
});
