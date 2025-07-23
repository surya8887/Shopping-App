import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const SignUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ApiError(400, "Please provide all fields"));
  }

  // Check if user already exists (recommended)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(409, "User already exists"));
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    return next(new ApiError(400, "Failed to create user"));
  }

  const userdata = await User.findOne({ email }).select("name email");

  return res
    .status(201)
    .json(new ApiResponse(201, userdata, "User created successfully"));
});

export { SignUp };
