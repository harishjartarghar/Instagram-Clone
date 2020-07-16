const User = require("../models/user");
const Post = require('../models/post');

exports.NewProfile=(req,res,next)=>{
    const {imageUrl}=req.body;
    const {_id}=req.user;
    User.findByIdAndUpdate({_id},{profile:imageUrl})
        .then(user=>{
            return res.status(201).json({message:"profile picture updated"});
        })
        .catch(error=>{
            return res.status(422).json({message:"something went wrong, Try again!"});
        })
}


exports.GetUserDetails=(req,res,next)=>{
        User.findOne({username:req.params.id})
        .select("-password")
        .then(user=>{
             Post.find({postedBy:user._id})
             .populate("postedBy","_id name")
             .exec((err,posts)=>{
                 if(err){
                     return res.status(422).json({error:err})
                 }
                 res.json({user,posts})
             })
        }).catch(err=>{
            return res.status(404).json({message:"User not found"})
        })
}