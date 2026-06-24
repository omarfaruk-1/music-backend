import {Router} from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../midllewares/auth.middleware.js";

const authRoute=Router();

/**
 * register user: localhost:5000/api/auth/register
 */
authRoute.post("/register",authController.register);

/**
 * login user: localhost:5000/api/auth/login
 */
authRoute.post("/login",authController.login);

/**
 * getMe : localhost:/5000/api/auth/get-me
 */
authRoute.get("/get-me",authMiddleware,authController.getMe);


/**
 * log-out user:localhost:/5000/api/auth/logout
 */
authRoute.get("/log-out",authController.logOut);

/**
 * log-out-all : localhost:/5000/api/auth/log-out-all
 */
authRoute.get("/log-out-all",authController.logOutAll)



export default authRoute;