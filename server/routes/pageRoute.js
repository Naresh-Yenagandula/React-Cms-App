const router = require('express').Router();
const User = require('../model/user');
const categories = require('../model/category');
const Page = require('../model/page');

//add page in DB
router.post('/pages',async (req,res)=>{
    const pages = new Page({
        title:req.body.title,
        category:req.body.category,
        author:req.body.author
    });
    try {
        const pageSave = await pages.save();
        res.json({message:"Added"});
    } catch (error) {
        // res.status(400).json({message:"Failed to add page"})
        res.status(400).json({message:"Failed to add page"})
    }
});

//add user in DB
router.post('/users',async (req,res)=>{
    const users = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        group:req.body.group
    });
    try {
        const userSave = await users.save();
        // let transporter = await nodemailer.createTransport({
        //     service:"gmail",
        //     auth:{
        //         user:"cmsappmailer@gmail.com",
        //         pass:"Cmsapp123##"
        //     }
        // })

        // let mailOptions = {
        //     from:'cmsappmailer@gmail.com',
        //     to:"ayamithakur@gmail.com",
        //     subject:'CMS App Credentials',
        //     text:'password'
        // }

        // transporter.sendMail(mailOptions)
        // .then((result)=>{
        //     console.log("email send");
        // })
        // .catch((err)=>{
        //     console.log("err");
        // })
        res.json({message:"Added"});

    } catch (error) {
        // res.status(400).json({message:"Failed to add user"})
        res.status(400).json({message:"Failed to add user"})
    }
});

//add category in DB
router.post('/categories',async (req,res)=>{
    const catg = new categories({
        title:req.body.title,
    });
    try {
        const categorySave = await catg.save();
        res.json({message:"Added"});
    } catch (error) {
        res.status(400).json({message:"Failed to add category"})
    }
});

//gets user data for pagination as per offset
router.get('/users/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await User.find().skip(offset).limit(5);
        const total= await User.countDocuments(); 
        return res.status(200).json({result:data,no:total});
    } catch (error) {
        res.status(400).json({message:"No Data"});
    }
});

//gets page data for pagination as per offset
router.get('/pages/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await Page.find().skip(offset).limit(5);
        const count = await Page.countDocuments();
        return res.status(200).json({result:data,no:count});
    } catch (error) {
        res.status(400).json({message:"No Data"})
    } 
});

//gets category data for pagination as per offset
router.get('/categories/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await categories.find().skip(offset).limit(5);
        const count = await categories.countDocuments();
        return res.status(200).json({result:data,no:count});
    } catch (error) {
        //  res.status(400).json({message:"error"});
        console.log("Failed to get category");
    }
});

//gets page details by Id
router.get('/page/:id',async(req,res)=>{
    try {
        const data = await Page.findById({_id:req.params.id});  
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:"Error"});
    }
});

//gets user details by Id
router.get('/user/:id',async(req,res)=>{
    try {
        const data = await User.findById({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        // res.status(400).json({message:"Error"});
        console.log("Fail to find user");
    }
});

//gets category details by Id
router.get('/category/:id',async(req,res)=>{
    try {
        const data = await categories.findById({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        // res.status(400).json({message:"Error"});
        console.log("failed to get category");
    }
});

//update page by Id
router.put('/pages/:id',async (req,res)=>{
    try {
        const data = await Page.findByIdAndUpdate(req.params.id,{
            $set:{title:req.body.title, category:req.body.category, author:req.body.author}
        },{useFindAndModify: false});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
        res.status(400).json({message:"Failed to update Page"})
    }
})

//update user by Id
router.put('/users/:id',async (req,res)=>{
    try {
        const data = await User.findByIdAndUpdate(req.params.id,{
            $set:{name:req.body.name, email:req.body.email, group:req.body.group}
        },{useFindAndModify: false});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
        console.log("Fail to update user");
    }
})

//update category by Id
router.put('/categories/:id',async (req,res)=>{
    try {
        const data = await categories.findByIdAndUpdate(req.params.id,{
            $set:{title:req.body.title}
        },{useFindAndModify:false});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
       console.log("Failed to update category");
    }
})

//delete page by Id
router.delete('/pages/:id',async (req,res)=>{
    try {
        const data  = await Page.findByIdAndDelete(req.params.id,{useFindAndModify:false});
        return res.status(200).json({message:"Page Deleted"});
    } catch (error) {
        res.status(400).json({message:"Fail to delete Page"});
        // console.log("Failed to delete page");
    }
})

//delete category by Id
router.delete('/categories/:id',async (req,res)=>{
    try {
        const data  = await categories.findByIdAndDelete(req.params.id,{useFindAndModify:false});
        return res.status(200).json({message:"Category Deleted"});
    } catch (error) {
        console.log("Failed to delete category");
    }
})

//delete user by Id
router.delete('/users/:id',async (req,res)=>{
    try {
        const data  = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"User Deleted"});
    } catch (error) {
        console.log("Failed to delete user");
    }
})

//gets latest users
router.get('/users',async (req,res)=>{
    try {
        const data = await User.find().sort({$natural:-1}).limit(5);
        return res.status(200).json(data);
    } catch (error) {
        console.log("failed to get users");
    }
})

//gets latest pages
router.get('/pages',async (req,res)=>{
    try {
        const data = await Page.find().sort({$natural:-1}).limit(5);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:"No Data"})
        // console.log("Failed to get pages");
    }
})

//gets All pages
router.get('/allPages',async (req,res)=>{
    try {
        const data = await Page.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:"No Data"})
        // console.log("Failed to get pages");
    }
})

//gets All users
router.get('/allUsers',async (req,res)=>{
    try {
        const data = await User.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:"No Data"})
        // console.log("Failed to get users");
    }
})

//gets All category
router.get('/allCategory',async (req,res)=>{
    try {
        const data = await categories.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({message:"No Data"})
        // console.log("Failed to get category");
    }
})

module.exports = router;