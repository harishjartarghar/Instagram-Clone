const express=require('express');
const app=express();


app.get('/post',(req,res)=>{
    res.send("hello post");
})
    

module.exports=app;