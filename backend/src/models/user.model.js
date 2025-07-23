import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      ref: "Cart",
      default: null,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Password verification
userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

// JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

const User = mongoose.models.User || model("User", userSchema);
export default User;
