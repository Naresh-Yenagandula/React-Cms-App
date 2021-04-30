const mongoose = require('mongoose');
const pagesScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
   
    author:{
        type:String,
        required:true
    }
});

module.exports  = mongoose.model('pages',pagesScheme);