import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.model.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized no token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Unauthorized- Access Token expired" });
      }

      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: "Error in 500 protectRoute" });
  }
};

export const adminRoute = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        }else {
            res.status(403).json({ message: "Forbidden - Admins only" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error in 500 adminRoute" });
    }
}