import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
    },

    model: {
      type: String,
      required: [true, "Model is required"],
    },

    type: {
      type: String,
      required: [true, "Vehicle type is required"],
    },

    year: {
      type: Number,
    },

    pricePerDay: {
      type: Number,
      required: [true, "Vehicle price is required"],
    },

    available: {
      type: Boolean,
    },

    imageUrls: {
      type: [String],
    },

    description: { type: String },

    createdAt: {
      type: Date,
      default: Date.now(),
      immutable: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
