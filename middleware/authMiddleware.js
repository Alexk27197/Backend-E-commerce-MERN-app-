import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization; // Get the token from the header

  if (token && token.startsWith("Bearer ")) {
    // Remove the "Bearer " prefix
    const tokenWithoutPrefix = token.slice(7);

    try {
      const decoded = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET);
      // Token is valid, proceed with the next middleware
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Missing or invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
};
