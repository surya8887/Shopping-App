import { Router } from "express";
import { SignUp } from "../controllers/user.controller.js";

const router = Router();

router.route('/sign-up').post(SignUp);


export default router;
