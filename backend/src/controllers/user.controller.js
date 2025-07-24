import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessAndRefreshToken,setTokenCookies } from "../utils/token.js";

// 📝 Sign Up
const SignUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(409, "User already exists"));
  }

  const newUser = await User.create({ name, email, password });
  if (!newUser) {
    return next(new ApiError(500, "Failed to create user"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);
  setTokenCookies(res, accessToken, refreshToken);

  const userData = await User.findById(newUser._id).select("name email role");

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully"));
});

// 🔑 Login
const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Email and password are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new ApiError(401, "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  setTokenCookies(res, accessToken, refreshToken);

  const userData = await User.findById(user._id).select("name email role");

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "Login successful"));
});

// 🚪 Logout
const Logout = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new ApiError(401, "Unauthorized"));
  }

  await User.findByIdAndUpdate(userId, { refreshToken: null });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export { SignUp, Login, Logout };
