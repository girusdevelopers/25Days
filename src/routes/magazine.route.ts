import express from 'express';
import { listUpload, upload ,allmagazine,updateMagazineDetails} from '@/controllers/magazine.controller';

const router = express.Router();

// Define your routes
router.post('/upload', upload);
router.get('/list-uploads', listUpload);
router.get('/getall', allmagazine);
router.put('/updateDetails/:id', updateMagazineDetails);

export default router;
