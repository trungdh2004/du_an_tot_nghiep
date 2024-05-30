import { Router } from "express";
import authController from "../controllers/auth.controller";
import authorization from "../middlewares/authentication";

const routerAuth = Router();

routerAuth.post("/login", authController.loginForm);
routerAuth.post("/register", authController.registerForm);
routerAuth.post("/sociol", authController.socialUser);
routerAuth.post("/forgotPassword", authController.forgotPassword);
routerAuth.post("/compareOtp", authController.compareOtp);
routerAuth.post("/updateForgotPassword", authController.updateForgotPassword);
routerAuth.post("/refreshToken", authController.refreshToken);
routerAuth.post("/logout", authorization, authController.logout);

export default routerAuth;
