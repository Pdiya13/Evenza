const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
}, { timestamps: true });


//prevent duplicate rating for same vendor + event
ratingSchema.index({ eventId: 1, vendorId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("ratingModel", ratingSchema);