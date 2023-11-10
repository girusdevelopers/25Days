import { Request, Response } from "express";
import { listUploads } from "@/utils/s3service";
import multer from "multer"; // Import multer library
import app from "@/app";
import Magazine from '@/models/magazine.model'
import { s3Uploadv3 } from "@/utils/s3service";
import { AWS_BUCKET_NAME, BASE_URL } from "@/config";

//const app = express(); // Create an Express app
app.use(multer().array("myFile")); // Use multer middleware to handle file uploads

export const upload = async (req: Request, res: Response) => {
  const {MagazineTitle,description}=req.body
  try {
    const results = await s3Uploadv3(req.files as Express.Multer.File[]);

    console.log(results);
    const file_location=results;
    const user = await Magazine.create({
      MagazineTitle,
      description,
      File_Location:`${BASE_URL}/v1/s3/readstream/${file_location}`,
     
    });
    console.log(file_location);
    res.json({
      message: "uploaded successfully",
      user: user
    });
  } catch (err) {
   res.send(err)
  }
};


// export const listUpload = async (req: Request, res: Response) => {
//   try {
//     const uploads = await listUploads();
//      res.status(200).json({ uploads });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
import { Location, S3 } from 'aws-sdk'; 
export const listUpload = async (req,res) => {
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
