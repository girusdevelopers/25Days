import { Router } from "express";
import {success, updateAudioDetails,
    getAudioDetails,
    deleteAudioDetails,
    getAudioById} from "@/controllers/audio.controller"
const router = Router();

// router.post("/audioupload",  success);//upload

// router.put('/audio/:id', updateAudioDetails);//update/

// router.get('/audio-details', getAudioDetails);//getall

// router.delete('/delete/:id', deleteAudioDetails);//deleteById

// router.get('/getbyId/:id', getAudioById);//getById

export default router;