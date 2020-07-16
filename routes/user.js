const express=require('express');
const app=express();
const {Verify}=require('../middlewares/authenticate');
const { NewProfile, GetUserDetails } = require('../controllers/userController');

app.route('/user/:id')
   .get(Verify,GetUserDetails);

app.route('/newprofile')
   .post(Verify,NewProfile);

    

module.exports=app;