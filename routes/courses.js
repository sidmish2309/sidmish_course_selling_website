function createCourseRoutes(app){
    app.post("/course/purchase", (req,res)=>{
        //right now we are not accepting payment scenerio
    
    })
    
    app.get("/course/preview", (req,res)=>{
        
    })
}

module.exports={
    createCourseRoutes:createCourseRoutes
}