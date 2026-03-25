const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendorModel",required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" , required:false},
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "eventModel",required: true },
    label: { type: String, required: true },
    checked: { type: Boolean, default: false },
    isPersonal: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Checklist', checklistItemSchema);
