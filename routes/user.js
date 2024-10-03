// const express=require('express');            //---> This is a object having a key Router
// const userRouter=express.Router;

//              OR
const {Router}=require('express');
const userRouter=Router();    //instance of a Router class


    userRouter.post("/signup", (req,res)=>{
        res.json({message:"user created"});
    })
    
    userRouter.post("/signin", (req,res)=>{
        res.json({message:"user signed in"});
    })
    
    
    userRouter.get("/purchases", (req,res)=>{
        res.json({message:"All user purchases"});
    })


module.exports={
    userRouter:userRouter
}