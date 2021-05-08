const router = require('express').Router();
const User = require('../model/user');
const rn = require('random-number')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.put('/users',async (req,res)=>{
    var gen = rn.generator({min:1000,max:9999,integer:true})
    try {
        var otp = gen()
        const data = await User.findOneAndUpdate({email:req.body.email},{
            $set:{otp:otp}
        },{useFindAndModify: false});

        if(!data) return res.status(400).json({message:'User not exists'}); 

        let transporter = await nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"cmsappmailer@gmail.com",
                pass:"Cmsapp123##"
            }
        })

        let mailOptions = {
            from:'cmsappmailer@gmail.com',
            to:req.body.email,
            subject:'OTP for CMS App login',
            text:'OTP is:'+otp
        }

        transporter.sendMail(mailOptions)
        .then((result)=>{
            console.log("email send");
        })
        .catch((err)=>{
            console.log("err");
        })
        return res.status(200).json(otp);
    } catch (error) {
        console.log("Fail to update otp");
    }
})


router.put('/clearOtp',async (req,res)=>{
    try {
        const data = await User.findOneAndUpdate({email:req.body.email},{
            $set:{otp:""}
        },{useFindAndModify: false});
        if(!data) return res.status(400).json({message:'User not exists'}); 
        return res.status(200).json({message:"Cleared Otp"});
    } catch (error) {
     res.status(400).json({message:"Otp not cleared"})  
    }
})

router.post('/users',async (req,res)=>{
    const user = await User.findOne({email:req.body.email,otp:req.body.otp});
    if(!user) return res.status(400).json({message:'Invalid Otp'});  

    //generates token with user id
    const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'});
    if(token) return res.status(200).json(token);

    res.json({message:'Logged in'});
})
module.exports = router;