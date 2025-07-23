import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    cartData: {
      type: Schema.Types.ObjectId,
      ref: "Cart", // Capitalize model name
      default: null,
    },
  },
  { timestamps: true }
);

// Use models to avoid overwrite error
const User = models.User || model("User", userSchema);

export default User;
