import { Router } from "express";
import { home, readstream } from "@controllers/index.controller";

const router = Router();
router.get("/", home);
router.get('/readstream/:key',readstream)

export default router;
