import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";

const favoriteRoute = Router();


/**
 * create favorite music list method-post: localhost:5000/api/favorites 
 */
favoriteRoute.post("/:musicId",authMiddleware,favoriteController.createFavoriteMusicList);
/**
 * get favorite music list method-get: localhost:5000/api/favorites 
 */
favoriteRoute.get("/",authMiddleware,favoriteController.getFavoriteMusic);
/**
 * remove favorite music from favorite music list method-delete: localhost:5000/api/favorites 
 */
favoriteRoute.delete("/:musicId",authMiddleware,favoriteController.removeFavoriteMusic)

export default favoriteRoute;