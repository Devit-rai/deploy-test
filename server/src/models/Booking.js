import mongoose from "mongoose";
import {
  BOOKING_STATUS_PENDING,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_COMPLETED,
  BOOKING_STATUS_CONFIRMED,
} from "../constants/bookingStatus.js";

const bookingSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle Number is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    bookingItems: [
      {
        vehicle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
          required: [true, "Vehicle ID is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1,
        },
        pricePerDay: {
          type: Number,
          required: [true, "Vehicle price per day is required"],
        },
        subtotal: {
          type: Number,
          required: [true, "Subtotal is required"],
        },
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
    },
    dropLocation: {
      type: String,
      required: [true, "Drop-off location is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    status: {
      type: String,
      enum: [
        BOOKING_STATUS_PENDING,
        BOOKING_STATUS_CONFIRMED,
        BOOKING_STATUS_CANCELLED,
        BOOKING_STATUS_COMPLETED,
      ],
      default: BOOKING_STATUS_PENDING,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payment:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
