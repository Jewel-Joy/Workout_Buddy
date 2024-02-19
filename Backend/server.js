
require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const workOut=require('./routes/workout');
const app=express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.use('/api/workout',workOut)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected and Server is running on port',process.env.PORT);
    })
})
.catch((err)=>{
    console.log('Error:',err);
})
