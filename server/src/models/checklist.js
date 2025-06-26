const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'eventModel',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel',
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    checked: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('checklistModel', checklistItemSchema);
