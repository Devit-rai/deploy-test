import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

//URL: /api/booking
router.get("/", auth, roleBasedAuth(ADMIN), bookingController.getBooking);

router.get("/user", bookingController.getBookedByUser);

router.get("/:id", auth, roleBasedAuth(ADMIN), bookingController.getBookedByID);

router.post("/", auth, bookingController.createBooking);

router.put("/:id", roleBasedAuth(ADMIN), bookingController.updateBooking);

router.delete("/:id", roleBasedAuth(ADMIN), bookingController.deleteBooking);

//URL: /api/booking/:id/payment
router.post("/:id/payment", auth, bookingController.bookingPayment);

router.put("/:id/payment/confirm", auth, bookingController.confirmBookingPayment);

export default router;
