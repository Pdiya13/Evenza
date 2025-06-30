const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendorModel" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" , required:true},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "eventModel" },
    label: { type: String, required: true },
    checked: { type: Boolean, default: false },
    isPersonal: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Checklist', checklistItemSchema);
