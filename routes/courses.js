const {Router}=require('express');
const { userMiddleware } = require('../middleware/user');
const courseRouter=Router();
const {purchaseModel, courseModel}=require('../db');

    courseRouter.post("/purchase", userMiddleware,async(req,res)=>{
        //right now we are not accepting payment scenerio

        const userId=req.userId;
        const courseId=req.body.courseId;

        //TODO: ideally we should check if user have completed the payment or not
        await purchaseModel.create({
            userId:userId,
            courseId:courseId
        });

        res.json({message:"You have successfully purchased the course"});
    
    })
    
    courseRouter.get("/preview", async(req,res)=>{

        //This doesn't need to be authenticated

        const courses=await courseModel.find({});
        res.json({message:"All Course preview", courses});
    })


module.exports={
    courseRouter:courseRouter
}