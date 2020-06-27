const express=require('express');
const app=express();


app.get('/user',(req,res)=>{
    res.send("hello user");
})
    

module.exports=app;