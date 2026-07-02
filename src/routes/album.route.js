import {Router} from "express";
import authorize from "../middlewares/authorization.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import albumController from "../controllers/album.controller.js";


const albumRoute = Router();



/**
 * create album: localhost:5000/api/albums
 */
albumRoute.post("/",authMiddleware,authorize,albumController.createAlbum);
/**
 * get all album:localhost:5000/api/albums
 */
albumRoute.get("/",authMiddleware,albumController.getAllAlbum);
/**
 * get my album : localhost:5000/api/albums
 */
albumRoute.get("/my-album",authMiddleware,authorize,albumController.getMyAlbum)
/**
 * specif album by id: localhost:5000/api/albums/:albumId
 */
albumRoute.get("/:albumId",authMiddleware,authorize,albumController.getAlbumById);
/**
 * update album title: localhost:5000/api/albums/:albumId
 */
albumRoute.patch("/update/:albumId",authMiddleware,authorize,albumController.updateAlbumTitle);
/**
 * delete album: localhost:5000/api/albums/:albumId
 */
albumRoute.delete("/:albumId",authMiddleware,authorize,albumController.deleteAlbum);
/**
 * add music in album: localhost:5000/api/albums/:albumId
 */
albumRoute.post("/:albumId",authMiddleware,authorize,albumController.addMusic)
/**
 * remove music from album: localhost:5000/api/albums/:albumId/music/:musicId
 */
albumRoute.delete("/:albumId/music/:musicId",authMiddleware,authorize,albumController.removeMusic);



export default albumRoute;