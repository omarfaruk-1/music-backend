import {Router} from "express";
import musicController from "../controllers/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";
import uploadFile from "../services/storage.service.js";


/**
 * getArtistMusics  updateMusic deleteMusic
 */

const musicRoute = Router();

musicRoute.post("/",authMiddleware,authorize,uploadFile,musicController.createMusic);
musicRoute.get("/",authMiddleware,musicController.getAllMusic)
musicRoute.get("/my-music",authMiddleware,authorize,musicController.getArtistMusic);
musicRoute.get("/:musicId",authMiddleware,musicController.getMusicById);
musicRoute.patch("/:musicId",authMiddleware,authorize,musicController.updateMusic);
musicRoute.delete("/:musicId",authMiddleware,authorize,musicController.deleteMusic)




export default musicRoute;