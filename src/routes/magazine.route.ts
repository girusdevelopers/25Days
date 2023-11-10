import express from 'express';
import { listUpload, upload } from '@/controllers/magazine.controller';

const router = express.Router();

// Define your routes
router.post('/upload', upload);
router.get('/list-uploads', listUpload);

export default router;
