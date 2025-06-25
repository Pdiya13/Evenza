const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'Unavailable'],
    default: 'available',
  },
  smartChecklist: {
    type: [String], 
    default: [],
  },
  budget: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('vendorModel', vendorSchema);
