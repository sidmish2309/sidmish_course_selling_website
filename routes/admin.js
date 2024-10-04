const {Router}=require('express');
const adminRouter=Router();
const {adminModel}=require('../db')

const jwt=require('jsonwebtoken');
const JWT_ADMIN_PASSWORD="alok1112";

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
    
    adminRouter.post("/course", (req,res)=>{
        res.json({message:"admin created a course"});
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