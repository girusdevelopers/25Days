import express from 'express';

import { bannerupload , allbanners} from '@/controllers/banner.controller';

const router = express.Router();

// Define your routes
router.post('/bannerupload', bannerupload);
router.get('/getall',allbanners)

export default router;
