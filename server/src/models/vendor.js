const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
    type:String , 
    required:true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'vendor'],
    default: 'vendor'
  }
}, { timestamps: true });

module.exports = mongoose.model('vendorModel', vendorSchema);
