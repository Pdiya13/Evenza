const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendorModel", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "eventModel", required: true },
    label: { type: String, required: true },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = mongoose.model('checklistModel', checklistItemSchema);
