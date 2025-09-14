import { PAYMENT_STATUS_COMPLETED } from "../constants/paymentStatus.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import payment from "../utils/payment.js";
import crypto from "crypto";

const createBooking = async (data, userID) => {
  const vehicleNumber = crypto.randomUUID();
  const booking = await Booking.create({
    ...data,
    user: userID,
    vehicleNumber,
  });

  return booking;
};

const getBooking = async () => {
  const booking = await Booking.find().populate("bookingItems.vehicle");

  return booking;
};

const deleteBooking = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);

  return booking;
};

const getBookedByUser = async (userid) => {
  const booking = await Booking.find({ user: userid })
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return booking;
};

const getBookedByID = async (id) => {
  const booking = await Booking.findById(id)
    .populate("bookingItems.vehicle")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return booking;
};

const updateBooking = async (id, data) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true }
  );

  return booking;
};

const bookingPayment = async (id) => {
  const book = await getBookedByID(id);
  const transactionId = crypto.randomUUID();

  const bookingPayment = await Payment.create({
    amount: book.totalAmount,
    method: "online",
    transactionId,
  });

  await Booking.findByIdAndUpdate(id, {
    payment: bookingPayment._id,
    status: "completed",
  });

  return await payment.payViaKhalti({
    amount: book.totalAmount,
    customer: book.user,
    purchaseOrderID: book.id,
    purchaseOrderName: book.vehicleNumber,
  });
};

const confirmPayment = async (id, status) => {
  const booking = await getBookedByID(id);
  if (status.toUpperCase() != PAYMENT_STATUS_COMPLETED) {
    await Payment.findByIdAndUpdate(booking.payment._id, {
      status: "failed",
    });
    throw { statusCode: 404, message: "Payment is not completed" };
  }
  await Payment.findByIdAndUpdate(booking.payment._id, {
    status: PAYMENT_STATUS_COMPLETED,
  });
  return await Booking.findByIdAndUpdate(
    id,
    {
      status: BOOKING_STATUS_CONFIRMED,
    },
    { new: true }
  );
};

export default {
  createBooking,
  getBooking,
  deleteBooking,
  getBookedByUser,
  getBookedByID,
  updateBooking,
  bookingPayment,
  confirmPayment,
};
