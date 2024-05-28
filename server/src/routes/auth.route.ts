import { Router } from "express";
import authController from "../controllers/auth.controller";

const routerAuth = Router();

routerAuth.post("/login", authController.loginForm);
routerAuth.post("/register", authController.registerForm);
routerAuth.post("/sociol", authController.socialUser);
routerAuth.post("/forgotPassword", authController.forgotPassword);
routerAuth.post("/compareOtp", authController.compareOtp);
routerAuth.post("/updateForgotPassword", authController.updateForgotPassword);

export default routerAuth;
