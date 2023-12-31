
import app from '@/app';
// import { logger } from '@/utils/color-logger';
import { MONGODB_URI, PORT } from '@config';
import connectDatabase from '@/databases';
import validateEnv from '@/utils/validateEnv';
import routes from './routes';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from 'multer';
import { listUploads } from '@/s3service'; // Assuming you have a function named listUploads
import s3Router from './routes/magazine.route'; // Import the router you created

// import audioRoutes from './routes/audio.routes'
// import videoRoutes from './routes/video.route'

// ROUTES
validateEnv();
connectDatabase();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1000000000, files: 2 },
});

const version = '/v1';
routes.forEach((route) => {
  const path = version + route.path;
  app.use(path, route.func);
});
//

app.use('/s3', s3Router);

//audio
// app.use('/',songRoutes)

// app.use('/',videoRoutes)

// LISTEN PORT
app.listen(PORT, () => {
  // logger('success')(`·•· ·•· ·•· ·•· ·•· ·•· ·•· ·•· ·•·`); 
  // logger('warning')(`App is running on http://localhost:${PORT}`);
  // logger('success')(`·•· ·•· ·•· ·•· ·•· ·•· ·•· ·•· ·•·`);
  console.log(`App is running on http://localhost:${PORT}`)
});

