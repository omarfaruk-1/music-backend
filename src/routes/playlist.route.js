import {Router} from "express";
import playlistController from "../controllers/playlist.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { uploadCoverImage } from "../middlewares/upload.middleware.js";

const playListRoute = Router();

/**
 * create a new playlist: localhost:5000/api/playlist
 */
playListRoute.post("/",authMiddleware,uploadCoverImage,playlistController.createPlayList);
/**
 * add music to playlist: localhost:5000/api/playlist/:playlistId/:musicId
 */
playListRoute.post("/:playlistId/:musicId",authMiddleware,playlistController.addMusicToPlaylist);
/**
 * get all playlists: localhost:5000/api/playlist
 */
playListRoute.get("/my",authMiddleware,playlistController.getMyPlaylists);
/**
 * get all public playlists: localhost:5000/api/playlist/public
 */
playListRoute.get("/",authMiddleware,playlistController.getAllPlaylists);  
/**
 * get playlist by id: localhost:5000/api/playlist/:playlistId
 */
playListRoute.get("/:playlistId",authMiddleware,playlistController.getPlaylistById);  
/**
 * update playlist: localhost:5000/api/playlist/:playlistId
 */
playListRoute.put("/:playlistId",authMiddleware,uploadCoverImage,playlistController.updatePlaylist);
/**
 * delete playlist: localhost:5000/api/playlist/:playlistId
 */
playListRoute.delete("/:playlistId",authMiddleware,playlistController.deletePlaylist);


export default playListRoute;