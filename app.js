const express=require('express');
const app=express();
const colors = require('colors');
app.use(express.json());



//--------------------MONGODB CONNECTION----------------------//
const mongoConnect=require('./config/database');
mongoConnect();
//------------------------------------------------------------//



app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use('/api/post',require('./routes/post'));


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//----------------Server Listening------------------//
const port=process.env.PORT || 8080;
app.listen(port,()=>{
    
    console.log(`Server Running at port ${port}`.brightYellow.underline);
})
//------------------------------------------------//