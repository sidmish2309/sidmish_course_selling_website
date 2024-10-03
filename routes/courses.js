const {Router}=require('express');
const courseRouter=Router();


    courseRouter.post("/course/purchase", (req,res)=>{
        //right now we are not accepting payment scenerio
        res.json({message:"Course purchased"});
    
    })
    
    courseRouter.get("/course/preview", (req,res)=>{
        res.json({message:"All Course preview"});
    })


module.exports={
    courseRouter:courseRouter
}