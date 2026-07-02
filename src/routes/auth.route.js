import {Router} from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRoute=Router();

/**
 * register user: localhost:5000/api/users/register
 */
authRoute.post("/register",authController.register);

/**
 * login user: localhost:5000/api/users/login
 */
authRoute.post("/login",authController.login);

/**
 * getMe : localhost:/5000/api/users/me
 */
authRoute.get("/me",authMiddleware,authController.getMe);

/**
 * refreshToken:localhost:/5000/api/users/refresh-token
 */
authRoute.get("/refresh-token",authMiddleware,authController.rotatedToken)

/**
 * log-out user:localhost:/5000/api/users/logout
 */
authRoute.get("/logout",authController.logOut);

/**
 * log-out-all : localhost:/5000/api/users/log-out-all
 */
authRoute.get("/log-out-all",authController.logOutAll)





export default authRoute;