import bookingServices from "../services/bookingServices.js";

const createBooking = async (req, res) => {
  const input = req.body;
  
  try {

    if (!input) {
      return res.status(400).send("Data should be include");
    }

    if (!input.bookingItems || !input.bookingItems.length) {
      return res.status(400).send("Booking items are required");
    }
    
    const booking = await bookingServices.createBooking(input, req.user);

    res.json(booking);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await bookingServices.getBooking();
    res.json(booking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteBooking = async (req, res) => {
  try {
    await bookingServices.deleteBooking(req.params.id);

    res.send("Deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBookedByUser = async (req, res) => {
  const input = req.user._id;

  if (!input) {
    throw { status: 404, message: "Booking not Found" };
  }

  try {
    const booking = await bookingServices.getBookedByUser(input);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getBookedByID = async (req, res) => {
  const input = req.params.id;
  
  if (!input) {
    throw { status: 404, message: "Id not Found" };
  }

  try {
    const booking = await bookingServices.getBookedByID(input);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateBooking = async (req, res) => {
  try {
    await bookingServices.updateBooking(req.params.id, req.body);

    res.send("Updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const bookingPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await bookingServices.bookingPayment(id);
    res.json(booking);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
const confirmBookingPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await bookingServices.bookingPayment(id, req.body.status);
    res.json(booking);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  createBooking,
  getBooking,
  deleteBooking,
  getBookedByUser,
  getBookedByID,
  updateBooking,
  bookingPayment,
  confirmBookingPayment,
};
