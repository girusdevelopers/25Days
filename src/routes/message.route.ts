import { Router } from 'express';
import * as message from '@/controllers/message.controller';

const router = Router();


router.post("uploade",message.uploade)

export default router;