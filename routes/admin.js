const {Router}=require('express');
const adminRouter=Router();
const {adminModel}=require('../db')

    adminRouter.post("/signup", (req,res)=>{
        res.json({message:"admin created"});
    })
    
    adminRouter.post("/signin", (req,res)=>{
        res.json({message:"admin signed in"});
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