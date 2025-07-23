import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import { trim } from "validator";

const addProduct = asyncHandler(async (req, res, next) => {
    const {
        name,
        price,
        description,
        image,
        category,
        subCategory,
        sizes,
        bestseller,
    } = req.body;
    if (
        [
            name,
            price,
            description,
            image,
            category,
            subCategory,
            sizes,
            bestseller,
        ].some((item) => !item.toString().trim())
    ) {
        return next(new ApiError("Please fill in all fields", 400));
    }
});


const listProdct = asyncHandler(async (req, res, next) => { });

const removeProdct = asyncHandler(async (req, res, next) => { });

const singleProduct = asyncHandler(async (req, res, next) => { });

export { addProduct, listProdct, removeProdct, singleProduct };