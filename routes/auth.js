const express=require('express');
const app=express();
const {CreateUser, Login, CheckUser}=require('../controllers/authControllers');


app.route('/signup')
   .post(CreateUser);

app.route('/signin')
   .post(Login)

app.route('/check')
   .post(CheckUser);

app.route('/resetpassword')
   .post();

app.route('/newpassword')
   .post();

module.exports=app;