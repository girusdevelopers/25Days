import { Request, Response } from 'express';
import { s3Uploadv3 } from '@/s3service';
import { listUploads } from '@/s3service';
//import { Request, Response } from 'express';
//import { s3Uploadv3 } from '@/s3service';
//import { listUploads } from '@/s3service';
import multer from 'multer'; // Import multer library
import app from '@/app';

//const app = express(); // Create an Express app
app.use(multer().array('myFile')); // Use multer middleware to handle file uploads


export const upload = async (req: Request, res: Response) => {
  try {
    const results = await s3Uploadv3(req.files as Express.Multer.File[]);
    
    console.log(results);
    return res.json({ status: 'success' });
  } catch (err) {
    console.log(err);
  }
};

// export const upload = async (req: Request, res: Response) => {
//     try {
//       if (!req.files || req.files.length === 0) {
//         console.error('No files to upload.');
//         return res.status(400).json({ error: 'No files to upload' });
//       }
  
//       const results = await s3Uploadv3(req.files as Express.Multer.File[]);
      
//       console.log(results);
//       return res.json({ status: 'success' });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  


export const listUpload = async (req: Request, res: Response) => {
  try {
    const uploads = await listUploads();
    return res.json({ uploads });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
