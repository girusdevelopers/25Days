import { Router } from 'express';
import * as message from '@/controllers/message.controller';

const router = Router();


router.post("/upload",message.upload)

router.get("/allmessages",message.getall)

router.put("/update/:id",message.UpdateMessage)

router.delete('/deletemessage/:id',message.deletebyId);

router.get("/findbyId/:id", message.findbyId)

export default router;