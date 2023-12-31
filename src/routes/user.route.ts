import { Router } from "express";
// import router from "./index.route";
import { signUp,login, logOut, forgotPassword, resetPassword} from "@/controllers/user.controllers";

const router = Router();


router.post("/user/register",  signUp);

router.post("/user/login",  login);

router.post("/user/logout",  logOut);

router.post("/user/forgotPassword",  forgotPassword);

router.post("/user/resetPassword",  resetPassword);





export default router;