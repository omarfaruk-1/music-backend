import {Router} from "express";
import musicController from "../controllers/music.controller.js"
import uploadMusic from "../midllewares/upload.midlleware.js";
import authMiddleware from "../midllewares/auth.middleware.js";
import authorize  from "../midllewares/authorization.midlleware.js";


/**
 * getArtistMusics  updateMusic deleteMusic
 */

const musicRoute = Router();

musicRoute.post("/",authMiddleware,authorize,uploadMusic,musicController.createMusic);
musicRoute.get("/",authMiddleware,musicController.getAllMusic)
musicRoute.get("/my-music",authMiddleware,authorize,musicController.getArtistMusic);
musicRoute.get("/:musicId",authMiddleware,musicController.getMusicById);
musicRoute.patch("/:musicId",authMiddleware,authorize,musicController.updateMusic);
musicRoute.delete("/:musicId",authMiddleware,authorize,musicController.deleteMusic)




export default musicRoute;