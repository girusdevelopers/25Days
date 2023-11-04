 

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';  
import { v4 as uuidv4 } from 'uuid';
 

const s3Uploadv3 = async (files: Express.Multer.File[]) => {
    if (!files || files.length === 0) {
       
      console.error('Nooo files to upload.');
      return [];
      
    }
  
    const s3client = new S3Client();
  
    const params = files.map((file: { originalname: any; buffer: any; }) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: `uploads/${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
      };
    });
  
    return await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
  };
  
const listUploads = async () => {
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
      console.error('Error listing objects from S3: Invalid response');
      return [];
    }
  } catch (err) {
    console.error('Error listing objects from S3:', err);
    throw err;
  }
};


import { Request, Response } from 'express';
 
import multer from 'multer';  
import app from '@/app';

 
app.use(multer().array('songs'));  


export const upload = async (req: Request, res: Response) => {
  try {
    const results = await s3Uploadv3(req.files as Express.Multer.File[]);
    
    console.log(results);
    return res.json({ status: 'success' });
  } catch (err) {
    console.log(err);
  }
};
 
export const listUpload = async (req: Request, res: Response) => {
  try {
    const uploads = await listUploads();
    return res.json({ uploads });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
