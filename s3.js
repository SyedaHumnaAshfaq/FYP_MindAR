require('dotenv').config(); 
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS SDK with your access key and secret key
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Use environment variables for security
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-2'  // e.g., 'us-east-1'
});

// Create S3 instance
const s3 = new AWS.S3();
const storage = multer.memoryStorage();  // Files are stored in memory. You can also use diskStorage if needed.
const upload = multer({ storage: storage });

const uploadToS3 = async (file, folder) => {
    console.log(process.env.AWS_BUCKET_NAME);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Use environment variables
        Key: `${folder}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read' // Make the file publicly accessible
    };

    try {
        const { Location } = await s3.upload(params).promise(); // Upload to S3
        return Location; // Return the file URL
    } catch (error) {
        throw new Error('Failed to upload file to S3: ' + error.message);
    }
};
// const upload = multer({ storage: storage });

// Set up Multer to use S3 for file storage
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'jewellerymodelsandimages',  // Your bucket name
//         acl: 'public-read',  // Make uploaded files publicly accessible
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '-' + file.originalname);  // File name format
//         }
//     })
// });

module.exports = {upload,uploadToS3};
