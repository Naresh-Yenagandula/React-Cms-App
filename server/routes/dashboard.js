const router = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

//get user details after token verified
router.get('/data',verify,(req,res)=>{
    try {
        User.findById({_id:decodedData._id},(error,data)=>{
            return res.status(200).json({name:data});
        });
    } catch (error) {
        console.log("error");
    }
})

let decodedData = "";

//verify token
function verify(req,res,next){
    const token = req.query.token;
    if (!token) return res.status(400).json({message:'Access Denied'});

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        decodedData = verified;
        next(); 
    } catch (error) {
        return res.status(400).json({message:'Token Expired'});
    }
}

module.exports = router;