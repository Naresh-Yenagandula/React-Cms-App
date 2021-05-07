const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    }
});

module.exports  = mongoose.model('users',userScheme);