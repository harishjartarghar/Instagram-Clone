const express=require('express');
const app=express();
const {Verify}=require('../middlewares/authenticate');
const { CreatePost, getMyPosts, getAllPosts } = require('../controllers/postContollers');

app.route('/create')
   .post(Verify ,CreatePost);

app.route('/AllPost')
   .get(Verify,getAllPosts);

app.route('/MyPost')
    .get(Verify,getMyPosts);
    
module.exports=app;