import mongoose from "mongoose";
import {ADMIN, USER} from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  roles: {
    type: [String],
    default: [USER],
    enum: [USER, ADMIN],
  },
  address: {
    city: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Province is required"],
    },
    street: {
      type: String,
      required: [true, "Street is required"],
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number must be unique"]
  },
  profileImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
