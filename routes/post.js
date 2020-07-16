const express=require('express');
const app=express();
const {Verify}=require('../middlewares/authenticate');
const { CreatePost, getMyPosts, getAllPosts ,LikePost,UnLikePost} = require('../controllers/postContollers');
const upload = require('../services/file-upload');
const singleUpload=upload.single('image');




app.route('/create')
   .post(Verify ,CreatePost);

app.route('/AllPost')
   .get(Verify,getAllPosts);

app.route('/mypost')
    .get(Verify,getMyPosts);

app.route('/like')
   .put(Verify,LikePost)

app.route('/unlike')
   .put(Verify,UnLikePost)

app.post('/image-upload',Verify,function(req, res) {

   singleUpload(req, res, function(err) {
 
     if (err) {
       console.log(err);
       return res.status(422).send({message:"Something went wrong, try again!"});
     }
 
     return res.status(201).json({'imageUrl': req.file.location});
   });
 });
    
module.exports=app;