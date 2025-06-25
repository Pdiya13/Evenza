const mongoose = require("mongoose");

const SelectVendor = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventModel",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendorModel",
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "rejected", "pending"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vendor_eventModel", SelectVendor);
