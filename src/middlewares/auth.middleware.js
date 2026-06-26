import jwt from "jsonwebtoken";
import appConfig from "../configs/appConfig.js";
import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)return res.status(401).json({ message: "Access token not found" });

    const decoded = jwt.verify(token, appConfig.JWT_ACCESS_TOKEN);

    const session = await sessionModel.findById(decoded.sessionId);
    if (!session || session.revoked)return res.status(401).json({ message: "Session expired" });

    const user = await userModel.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    req.user = user;
    next();
    
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}


export default authMiddleware;