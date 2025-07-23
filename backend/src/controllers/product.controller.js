import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, category, subCategory, sizes, bestseller } = req.body;

  // Validate required fields
  const requiredFields = [name, price, description, category, subCategory, sizes];
  if (requiredFields.some((field) => !field || field.toString().trim() === "")) {
    return next(new ApiError(400, "Please fill in all required fields"));
  }
  if (typeof bestseller === "undefined") {
    return next(new ApiError(400, "Bestseller field is required"));
  }

  // Parse sizes
  let parsedSizes;
  try {
    parsedSizes = JSON.parse(sizes);
  } catch (err) {
    return next(new ApiError(400, "Invalid sizes format"));
  }

  // Handle image uploads
  const image1 = req?.files?.image1?.[0];
  const image2 = req?.files?.image2?.[0];
  const image3 = req?.files?.image3?.[0];
  const image4 = req?.files?.image4?.[0];
  const images = [image1, image2, image3, image4].filter(Boolean);

  if (images.length === 0) {
    return next(new ApiError(400, "At least one image is required"));
  }

  const imageUrls = [];

  try {
    for (const image of images) {
      const result = await uploadOnCloudinary(image.path);
      if (!result?.secure_url) throw new Error("Upload failed");
      imageUrls.push(result.secure_url);
    }
  } catch (error) {
    return next(new ApiError(500, "Image upload failed"));
  }

  const productDetails = {
    name,
    price: Number(price),
    description,
    image: imageUrls,
    category,
    subCategory,
    sizes: parsedSizes,
    bestseller: bestseller === "true",
    date: new Date(),
  };

  const product = await Product.create(productDetails);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});

const listProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate("name price description image category ");

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products listed successfully"));
});

const removeProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return next(new ApiError(400, "Product ID is required"));
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product removed successfully"));
});

const singleProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return next(new ApiError(400, "Product ID is required"));
  }

  const product = await Product.findById(productId).populate("category subCategory");

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product found successfully"));
});

export { addProduct, listProduct, removeProduct, singleProduct };
