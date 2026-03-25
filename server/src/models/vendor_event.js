const mongoose = require("mongoose");

const vendor_eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventModel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
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
    eventDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default:"Pending",
    },
  },
  { timestamps: true }
);

vendor_eventSchema.index(
  { eventId: 1, vendorId: 1 },
  { unique: true }
);

module.exports = mongoose.model("vendor_eventModel", vendor_eventSchema);
