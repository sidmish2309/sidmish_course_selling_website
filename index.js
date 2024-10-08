require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');

const {userRouter}=require('./routes/user');
const {courseRouter}=require('./routes/courses');
const {adminRouter}=require('./routes/admin');

const app=express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


//HomeWork--> try to use .env file to store the database connection string

//so, that firstly mongoose will be connected then backend starts else fails
async function main(){
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(3000,()=>{
    console.log("Server is running on port 3000");
  });
}

main();
