const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



aws.config.update({
  secretAccessKey: 'YSV/9n0QEaKZdnlsXwM23HLYyLp4RvT70LEc1/ht',
  accessKeyId: 'AKIAIJ6ZXWUSHZTYSEHQ',
  region: 'ap-south-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'instagramclone-harish',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;