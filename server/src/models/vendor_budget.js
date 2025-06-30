const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const vendorBudgetSchema = new Schema({
  eventId: {
    type: ObjectId,
    ref: "eventModel",
    required: true,
  },
  vendorId: {
    type: ObjectId,
    ref: "vendorModel",
    required: true,
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

const vendor_budgetModel = mongoose.model('vendor_budget', vendorBudgetSchema);

module.exports = { vendor_budgetModel };
