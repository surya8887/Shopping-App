import Product from "../models/product.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import mongoose from "mongoose";
// 🔼 Utility: Extract image files
const extractImages = (files) => {
  return ["image1", "image2", "image3", "image4"]
    .map((key) => files?.[key]?.[0])
    .filter(Boolean);
};

// ➕ Add New Product
export const addProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    description,
    category,
    subCategory,
    sizes,
    bestseller,
  } = req.body;

  // Validate input fields
  if (
    !name ||
    !price ||
    !description ||
    !category ||
    !subCategory ||
    !sizes ||
    typeof bestseller === "undefined"
  ) {
    return next(new ApiError(400, "All required fields must be provided"));
  }

  // Parse sizes array safely
  let parsedSizes;
  try {
    parsedSizes = JSON.parse(sizes);
    if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      throw new Error("Sizes must be a non-empty array");
    }
  } catch (error) {
    return next(new ApiError(400, "Invalid sizes format"));
  }

  // Handle image uploads
  const images = extractImages(req.files);
  if (images.length === 0) {
    return next(new ApiError(400, "At least one image is required"));
  }

  let imageUrls = [];
  try {
    imageUrls = await Promise.all(
      images.map(async (image) => {
        const result = await uploadOnCloudinary(image.path);
        if (!result?.secure_url) throw new Error("Upload failed");
        return result.secure_url;
      })
    );
  } catch {
    return next(new ApiError(500, "Failed to upload images"));
  }

  // Create product document
  const product = await Product.create({
    name,
    price: Number(price),
    description,
    image: imageUrls,
    category,
    subCategory,
    sizes: parsedSizes,
    bestseller: bestseller === "true" || bestseller === true,
    date: new Date(),
  });

  return res.status(201).json(
    new ApiResponse(201, {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      bestseller: product.bestseller,
    }, "Product created successfully")
  );
});

// 📃 Get All Products
export const listProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}, "_id name price image category bestseller");

  return res.status(200).json(
    new ApiResponse(200, products, "Products fetched successfully")
  );
});

// 🔍 Get Single Product by ID
export const singleProduct = asyncHandler(async (req, res, next) => {
  const id= req.params.id?.trim();

  if (!id) return next(new ApiError(400, "Product ID is required"));

  const product = await Product.findById(id).populate("category subCategory");
  if (!product) return next(new ApiError(404, "Product not found"));

  return res.status(200).json(
    new ApiResponse(200, {
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestseller: product.bestseller,
    }, "Product details fetched")
  );
});

// ❌ Delete Product by ID
export const removeProduct = asyncHandler(async (req, res, next) => {
  const rawId = req.params.id?.trim();

  if (!rawId) {
    return next(new ApiError(400, "Product ID is required"));
  }

  if (!mongoose.Types.ObjectId.isValid(rawId)) {
    return next(new ApiError(400, "Invalid Product ID format"));
  }

  const product = await Product.findByIdAndDelete(rawId);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res.status(200).json(
    new ApiResponse(200, {
      _id: product._id,
      name: product.name,
      deletedAt: new Date().toISOString(),
    }, "Product deleted successfully")
  );
});
