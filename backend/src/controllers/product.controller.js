import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";

const addProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, category, subCategory, sizes, bestseller } =
    req.body;

  // Validate required fields
  if (
    [name, price, description, category, subCategory, sizes, bestseller].some(
      (item) => item === undefined || item.toString().trim() === ""
    )
  ) {
    return next(new ApiError(400, "Please fill in all fields"));
  }

  // Validate images
  const image1 = req?.files?.image1?.[0];
  const image2 = req?.files?.image2?.[0];
  const image3 = req?.files?.image3?.[0];
  const image4 = req?.files?.image4?.[0];
  //   console.log(image1);

  const images = [image1, image2, image3, image4].filter(Boolean);

  if (images.length === 0) {
    return next(new ApiError(400, "At least one image is required"));
  }
  // Upload images to Cloudinary
  const imageUrl = await Promise.all(
    images.map(async (image) => {
      const result = await uploadOnCloudinary(image.path);

      if (!result || !result.secure_url) {
        throw new ApiError(500, "Image upload failed");
      }

      return result.secure_url;
    })
  );

  const productDetails = {
    name,
    price: Number(price),
    description,
    image: imageUrl,
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestseller: bestseller === "true",
    date: new Date(),
  };
  // Create product
  const product = await Product.create(productDetails);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully"));
});

const listProduct = asyncHandler(async (req, res, next) => {});

const removeProduct = asyncHandler(async (req, res, next) => {});

const singleProduct = asyncHandler(async (req, res, next) => {});

export { addProduct, listProduct, removeProduct, singleProduct };
