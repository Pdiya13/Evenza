const mongoose = require('mongoose');
const userModel = require('../models/user');
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
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userModel',
    // required:true
  }
}, { timestamps: true });

module.exports = mongoose.model('eventModel', eventSchema);
