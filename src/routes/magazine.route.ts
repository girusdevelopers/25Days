import express from 'express';
import { listUpload, upload, } from '@/controllers/magazine.controller';
import app from '@/app';
import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '@/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { s3 } from '@/utils/aws';
import { readstream } from '@/controllers/index.controller';
const router = express.Router();

// Define your routes
router.post('/upload', upload);

router.get('/list-uploads', listUpload);

router.get('/readstream/:key',readstream)


          
          




// router.get('/audio', (req, res) => {
//     const {key}= req.body
//     const s3 = new AWS.S3();
//     const bucketName = AWS_BUCKET_NAME; // Replace with your S3 bucket name
//     const objectKey = `uploads/${key}`

//     const params = {
//         Bucket: bucketName,
//         Key: objectKey,
//     };
 
//     const fileStream = s3.getObject(params).createReadStream();
    
//     // console.log(fileStream)
//     fileStream.pipe(res);
// });


// import multer from 'multer';

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// import AWS from 'aws-sdk';
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// app.post('/upload/magzasine', upload.single('file'), async (req, res) => {
//     const file = req.file;
//   console.log(file.originalname)
//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: file.originalname,
//       Body: file.buffer,
//     //   ContentType: file.mimetype
//     };
  
//     try {
//       await s3.upload(params).promise();
//       res.status(200).send('File uploaded to S3 successfully!');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error uploading file to S3');
//     }
//   });


export default router;
