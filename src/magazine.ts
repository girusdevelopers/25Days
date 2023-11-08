 
import { S3 } from 'aws-sdk';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const s3Uploadv2 = async (files: Express.Multer.File[]) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

export const s3Uploadv3 = async (files: Express.Multer.File[]) => {
  const s3client = new S3Client();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  

  return await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param))));
};




import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
//import { s3Uploadv3 } from './s3Service';
//import { v4 as uuidv4 } from 'uuid';
const app = express();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

app.post('/upload', upload.array('file'), async (req: express.Request, res: express.Response) =>  {
  try {
    const results = await s3Uploadv3(req.files as Express.Multer.File[]);
    console.log(results);
    return res.json({ status: 'success' });
  } catch (err) {
    console.log(err);
  }
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'file is too large',
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'File limit reached',
      });
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'File must be an image',
      });
    }
  }
});





 //import { S3 } from 'aws-sdk';

export const listUpload = async () => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    if (data.Contents && Array.isArray(data.Contents)) {
      const uploads = data.Contents.map((object) => object.Key);
      return uploads;
    } else {
      // Handle the case where data.Contents is undefined or not an array.
      console.error('Error listing objects from S3: Invalid response');
      return [];
    }
  } catch (err) {
    console.error('Error listing objects from S3:', err);
    throw err;
  }
};


app.get('/list-uploads', async (req: express.Request, res: express.Response) => {
  try {
    const uploads = await listUpload();
    return res.json({ uploads });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(4000, () => console.log('listening on port 4000'));
function listUploads() {
  throw new Error('Function not implemented.');
}

