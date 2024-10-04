// const express=require('express');            //---> This is a object having a key Router
// const userRouter=express.Router;

//              OR
const {Router}=require('express');
const userRouter=Router();    //instance of a Router class
const {userModel}=require('../db')

const jwt=require('jsonwebtoken');
const {JWT_USER_PASSWORD}=require('../config');
const { userMiddleware } = require('../middleware/user');


    userRouter.post("/signup", async(req,res)=>{
       const {email, password, firstName, lastName} = req.body;
       // TODO: Now, we have to add Zod Validation
       //TODO: we need to hash the password using bcrypt

       //TODO: put this inside a try catch block
       await userModel.create({
        email:email, 
        password:password, 
        firstName:firstName, 
        lastName:lastName
        });


        res.json({message: "user signup succeeded"});

    })
    
    userRouter.post("/signin", async(req,res)=>{

        //TODO: ideally the password should be hashed so u can't compare user provided password with the one in the database
        const {email, password} = req.body;

        const user=await userModel.findOne({email:email, password:password}); //remember why using findOne??
        if(user){
            const token=jwt.sign({id:user._id}, JWT_USER_PASSWORD); //token based authentication
            res.json({message:"user signed in", token:token});
        }
        
        else{
            res.status(403).json({message:"Invalid Credentials"});
        }
    })
    
    
    userRouter.get("/purchases", userMiddleware, async(req,res)=>{
        const userId=req.userId;
        const purchases=await purchaseModel.find({userId:userId});

        //As we don't have course data in the PURCHASE database, we are fetching it from the database
        const courseData=await courseModel.find({
            _id:{$in:purchases.map(x=>x.courseId)}
        });

        res.json({message:"All user purchases", purchases, courseData});
    })


module.exports={
    userRouter:userRouter
}