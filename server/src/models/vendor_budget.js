const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const vendorBudgetSchema = new mongoose.Schema({
  eventId: {
    type: ObjectId,
    ref: "eventModel",
    required: true,
  },
  vendorId: {
    type: ObjectId,
    ref: "vendorModel",
    required: false,
  },
  userId: {
    type: ObjectId,
    ref: "userModel",
  },
  isVendor: {
    type: Boolean,
    default: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  items: [
    {
      category: { type: String, required: true },
      cost: { type: Number, required: true },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('vendor_budget', vendorBudgetSchema);
