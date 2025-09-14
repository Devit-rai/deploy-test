import mongoose from "mongoose";
import {
  PAYMENT_STATUS_COMPLETED,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_PENDING,
} from "../constants/paymentStatus.js";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required."],
    min: 0,
  },
  method: {
    type: String,
    required: [true, "Payment method is required."],
    enum: ["cash", "card", "online"],
  },
  status: {
    type: String,
    default: PAYMENT_STATUS_PENDING,
    enum: [
      PAYMENT_STATUS_COMPLETED,
      PAYMENT_STATUS_PENDING,
      PAYMENT_STATUS_FAILED,
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
