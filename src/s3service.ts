
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { S3 } from 'aws-sdk'; // Import S3 from 'aws-sdk' for AWS SDK version 2
// import { v4 as uuidv4 } from 'uuid';
 

// // export const s3Uploadv3 = async (files: Express.Multer.File[]) => {
// //     if (!files || files.length === 0) {
// //       // Handle the case when files are undefined or empty
// //       console.error('Nooo files to upload.');
// //       return [];
      
// //     }
  
// //     const s3client = new S3Client();
  
// //     const params = files.map((file: { originalname: any; buffer: any; }) => {
// //       return {
// //         Bucket: process.env.AWS_BUCKET_NAME as string,
// //         Key: `uploads/${uuidv4()}-${file.originalname}`,
// //         Body: file.buffer,
// //       };
// //     });
  
// //     return await Promise.all(
// //       params.map((param) => s3client.send(new PutObjectCommand(param)))
// //     );
// //   };


// export const s3Uploadv3 = async (files: Express.Multer.File[]) => {
//   if (!files || files.length === 0) {
//     console.error('No files to upload.');
//     return [];
//   }

//   const s3client = new S3Client();
//   const uploadedFiles = [];

//   for (const file of files) {
//     const originalFilename = file.originalname.trim();
//     const key = `uploads/${uuidv4()}-${originalFilename}`;
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME as string,
//       Key: key,
//       Body: file.buffer,
//     };

//     // Upload the file
//     const uploadResult = await s3client.send(new PutObjectCommand(params));
//     const location = getSignedUrl(s3client, new PutObjectCommand({ ...params, Key: encodeURIComponent(key) }));
//     uploadedFiles.push(location);
//   }
//   return uploadedFiles;
// };








  
// export const listUploads = async () => {
//   const s3 = new S3();

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME as string,
//   };

//   try {
//     const data = await s3.listObjectsV2(params).promise();
//     if (data.Contents && Array.isArray(data.Contents)) {
//       const uploads = data.Contents.map((object) => object.Key);
//       return uploads;
//     } else {
//       console.error('Error listing objects from S3: Invalid response');
//       return [];
//     }
//   } catch (err) {
//     console.error('Error listing objects from S3:', err);
//     throw err;
//   }
// };
// function getSignedUrl(s3client: S3Client, arg1: PutObjectCommand) {
//   throw new Error('Function not implemented.');
// }

