import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import historyController from "../controllers/history.controller.js";


const historyRoute=Router();


/**
 * get all history method-get: localhost:5000/api/histories
 */
historyRoute.get("/",authMiddleware,historyController.getAllHistory);
/**
 * delete all history method-delete: localhost:5000/api/histories/
 */
historyRoute.delete("/",authMiddleware,historyController.clearHistory);
/**
 * delete single history method-delete: localhost:5000/api/histories/:historyId
 */
historyRoute.delete("/:historyId",authMiddleware,historyController.deleteHistory);

export default historyRoute;