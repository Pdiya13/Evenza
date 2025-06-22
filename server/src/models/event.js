const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  ename: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('eventModel', eventSchema);
