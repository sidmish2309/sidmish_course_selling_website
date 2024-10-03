const express=require('express');
const app=express();

const {createUserRoutes}=require('./routes/user');
const {createCourseRoutes}=require('./routes/courses');

createUserRoutes(app);
createCourseRoutes(app);

app.listen(3000);