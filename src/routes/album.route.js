import {Router} from "express";
import authorize from "../middlewares/authorization.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import albumController from "../controllers/album.controller.js";


const albumRoute = Router();



/**
 * create album: localhost:5000/api/album
 */
albumRoute.post("/",authMiddleware,authorize,albumController.createAlbum)



export default albumRoute;