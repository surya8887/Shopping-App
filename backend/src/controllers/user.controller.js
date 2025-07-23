import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// 🔒 Generate Tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(`Token error: ${error.message}`);
    throw new ApiError(500, "Token generation failed");
  }
};

// 🍪 Set cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
};

// 📝 Sign Up
const SignUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password)
    return next(new ApiError(400, "All fields required"));

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ApiError(409, "User already exists"));

  const user = await User.create({ name, email, password });
  if (!user) return next(new ApiError(400, "User creation failed"));

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  setTokenCookies(res, accessToken, refreshToken);

  const userdata = await User.findById(user._id).select("name email");
  return res
    .status(201)
    .json(new ApiResponse(201, userdata, "User registered successfully"));
});

// 🔑 Login
const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ApiError(400, "Email and password required"));

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(401, "Invalid credentials"));

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) return next(new ApiError(401, "Invalid credentials"));

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  setTokenCookies(res, accessToken, refreshToken);

  const userdata = await User.findById(user._id).select("name email");
  return res
    .status(200)
    .json(new ApiResponse(200, userdata, "Login successful"));
});

// 🚪 Logout
const Logout = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);
  if (!userId) return next(new ApiError(401, "Unauthorized", true));
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export { SignUp, Login, Logout };
