const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

//add incoming user data in Db .
router.post('/register',async (req,res)=>{

    //checks existing email
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).json({message:'Email Already Exists'});

    const password = generator.generate({
        length: 15,
        numbers: true,
        symbols:true
    });
    // console.log(password);

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        group:req.body.group,
        otp:""
    });
    try {
        const userSave = await user.save();
        let transporter = await nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"cmsappmailer@gmail.com",
                pass:"Cmsapp123##"
            }
        })

        let mailOptions = {
            from:'CMS System <cmsappmailer@gmail.com>',
            to:req.body.email,
            subject:'CMS App Credentials',
            text:'Your Credential for CMS App Login: \nEmail Id: '+req.body.email+'\n Password: '+password
        }

        transporter.sendMail(mailOptions)
        .then((result)=>{
            console.log("email send");
        })
        .catch((err)=>{
            console.log("err");
        })
        res.json({message:"Added"});
    } catch (error) {
        console.log(error)
    }
});

//verify user login credentials
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:'User not exists'});  

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json('Email and password combination does not match');

    //generates token with user id
    const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'});
    if(token) return res.status(200).json(token);

    res.json({message:'Logged in'});
})

module.exports = router;