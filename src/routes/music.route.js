import {Router} from "express";
import musicController from "../controllers/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorization.middleware.js";
import {uploadMusic} from "../middlewares/upload.middleware.js";

const musicRoute = Router();

/**
 *? add music method-post: localhost:5000/musics
 */
musicRoute.post("/",authMiddleware,authorize,uploadMusic,musicController.createMusic);
/**
 *? get all musics method-get: localhost:5000/musics
 *?also a user can search by title and filter by artist name and genre a user can also sort az-za sort latest and oldest
 */
musicRoute.get("/",authMiddleware,musicController.getAllMusic);
/**
 *? get artist musics method-get: localhost:5000/musics/:
 */
musicRoute.get("/my-music",authMiddleware,authorize,musicController.getArtistMusic);
/**
 *? get specific music by music id method-get: localhost:5000/musics/:musicId
 */
musicRoute.get("/:musicId",authMiddleware,musicController.getMusicById);
/**
 *? update music method-patch: localhost:5000/musics/:musicId
 */
musicRoute.patch("/:musicId",authMiddleware,authorize,musicController.updateMusic);
/**
 *? update music playCount method-patch: localhost:5000/musics/:musicId/play
 */
musicRoute.post("/:musicId/play",authMiddleware,musicController.playMusic);
/**
 *? delete music method-delete: localhost:5000/musics/:musicId/play
 */
musicRoute.delete("/:musicId",authMiddleware,authorize,musicController.deleteMusic);

export default musicRoute;