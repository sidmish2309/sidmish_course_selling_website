const {Router}=require('express');
const adminRouter=Router();
const {adminModel}=require('../db')

const jwt=require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD}=require('../config');
const { adminMiddleware } = require('../middleware/admin');

    adminRouter.post("/signup", async(req,res)=>{
        const {email, password, firstName, lastName} = req.body;
        // TODO: Now, we have to add Zod Validation
        //TODO: we need to hash the password using bcrypt
 
        //TODO: put this inside a try catch block
        await adminModel.create({
         email:email, 
         password:password, 
         firstName:firstName, 
         lastName:lastName
         });
 
 
         res.json({message: "admin signup succeeded"});
    })
    
    adminRouter.post("/signin", async(req,res)=>{
       //TODO: ideally the password should be hashed so u can't compare user provided password with the one in the database
       const {email, password} = req.body;

       const admin=await adminModel.findOne({email:email, password:password}); //remember why using findOne??
       if(admin){
           const token=jwt.sign({id:admin._id}, JWT_ADMIN_PASSWORD); //token based authentication
           res.json({message:"admin signed in", token:token});
       }
       
       else{
           res.status(403).json({message:"Invalid Credentials"});
       }
    })
    
    adminRouter.post("/course", adminMiddleware ,async(req,res)=>{

        const adminId=req.adminId;
        const {title, description, imageUrl, price} = req.body;

        //TODO: create a saas in 6 hours as we are taking imageUrl from user
        const course= await courseModel.create({
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,
            creatorId:adminId
        })

        res.json({message:"Course created", courseId:course._id});
    })

    adminRouter.put("/course", (req,res)=>{
        res.json({message:"admin updated a course"});
    })

    adminRouter.get("/course/bulk", (req,res)=>{
        res.json({message:"admin sees all courses"});
    })

    module.exports={
        adminRouter:adminRouter
    }