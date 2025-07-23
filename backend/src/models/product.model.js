import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: [String], 
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String], // Define the type of array elements
      required: true,
    },
    bestseller: {
      type: Boolean,
    },
    date: {
      type: Date,

    },
  },
  { timestamps: true }
);

// Prevent model overwrite error in development
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
