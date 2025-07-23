import { Router } from "express";
import { SignUp, Login, Logout } from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/sign-up").post(SignUp);
router.route("/login").post(Login);
router.route("/logout").get(verifyjwt, Logout);

export default router;
