import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appConfig from "../configs/appConfig.js";
import sessionModel from "../models/session.model.js";
import crypto from "node:crypto";

async function register(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All flied are required" });

    const userExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist)
      return res
        .status(409)
        .json({ message: "Username or email already exist" });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      appConfig.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip:
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
    });

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, sessionId: session._id },
      appConfig.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User create successfully",
      user: {
        username: username,
        email: email,
        role: role,
      },
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credential" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credential" });

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      appConfig.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, sessionId: session._id },
      appConfig.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" },
    );

    (res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }),
      res.status(200).json({
        message: "User login successfully",
        user: {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken: accessToken,
      }));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getMe(req, res) {
  try {
    res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function rotatedToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token not found" });

    const decoded = jwt.verify(refreshToken, appConfig.JWT_REFRESH_TOKEN);

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });
    if (!session) return res.status(401).json({ message: "Session not found" });

    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role, sessionId: session._id },
      appConfig.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" },
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      appConfig.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );
    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Access token refresh successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function logOut(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token not found" });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await sessionModel.findOne({
      refreshTokenHash,
      revoked: false,
    });
    if (!session) return res.status(401).json({ message: "Invalid token" });
    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
}

async function logOutAll(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)return res.status(401).json({ message: "Refresh token not found" });

    const decoded = jwt.verify(refreshToken, appConfig.JWT_REFRESH_TOKEN);

    await sessionModel.updateMany(
      {
        user: decoded.userId,
        revoked: false,
      },
      { revoked: true },
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
}
export default { register, login, getMe, rotatedToken, logOut ,logOutAll};
