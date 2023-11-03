import app from "@/app";
import { logger } from "@utils/logger";
import { NODE_ENV } from "@config";
import { MONGODB_URI, PORT } from '@config';
import validateEnv from "@utils/validateEnv";
import routes from './routes';
import connectDatabase from '@/databases';


validateEnv();
connectDatabase(MONGODB_URI);

const version = '/v1';
routes.forEach((route) => {
  const path = version + route.path;
  app.use(path, route.func);
});


import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import { listUploads } from '@/s3service'; // Assuming you have a function named listUploads
import s3Router from './routes/magazine.route'; // Import the router you created

//const app = express();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

// Use your s3Router for the '/s3' path
app.use('/s3', s3Router);

// Continue with your listUpload and other configurations

//app.listen(4000, () => console.log('listening on port 4000'));



app.listen(PORT, () => {
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port http://localhost:${PORT}`);
});
