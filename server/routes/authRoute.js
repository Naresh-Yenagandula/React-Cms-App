const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//add incoming user data in DB
router.post('/register',async (req,res)=>{

    //checks existing email
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).json({message:'Email Already Exists'});

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        group:req.body.group
    });
    try {
        const userSave = await user.save();
        res.json({message:"Added"});
    } catch (error) {
        console.log("Failed to add user");
    }
});

//verify user login credentials
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:'User not exists'});  

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json({message:'Email and password combination does not match'});

    //generates token with user id
    const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'});
    if(token) return res.status(200).json(token);

    res.json({message:'Logged in'});
})

module.exports = router;