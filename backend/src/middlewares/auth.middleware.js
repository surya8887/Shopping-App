import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyjwt = asyncHandler(async (req, res, next) => {
  // 📦 Get token from cookie or header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ApiError(401, "No token provided, access denied."));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token."));
  }

  const user = await User.findById(decoded._id).select("-password -refreshToken");

  if (!user) {
    return next(new ApiError(401, "User not found."));
  }

  req.user = user; // ✅ Attach to request
  next();
});


export const onlyAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== "admin") {
    return next(new ApiError(403, "Access denied. Admins only."));
  }

  next();
});

export { verifyjwt };
