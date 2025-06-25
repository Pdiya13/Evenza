const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  name :{
    type:String ,
    required:true
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
  experience : {
    type:Number,
    required:true,
  }
}, { timestamps: true });

module.exports = mongoose.model('vendorModel', vendorSchema);