const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name:{
        type:String , required:true
    },
    email:{
        type:String , required:true , unique:true
    },
    password:{
        type:String , 
        required:true,
    },
    phone:{
        type:String , 
        required:true
    },
    role:{
        type:String,
        enum:['user' , 'vendor'],
        default : 'user'
    }
})

const userModel = mongoose.model('userModel' , user);

module.exports = {userModel};