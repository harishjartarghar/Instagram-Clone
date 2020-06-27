const Post = require('../models/post');

exports.CreatePost= async (req,res,next)=>{
    const {caption,location,photo}=req.body;
    const post=new Post({caption,location , photo , postedBy:req.user});
    try { 
        post.save()
            .then((post)=>{
                return res.status(201).json({post});
            })
            .catch((error)=>{
                console.log(error);
                return res.status(422).json({errr:'something went wrong, try after sometime'});
            })
    } catch (error) {

        return res.status(400).json({error});
    }
}


exports.getAllPosts=(req,res,next)=>{
    Post.find()
        .populate("postedBy","_id username")
        .then(allpost=>{
            return res.json({allpost});
        })
}


exports.getMyPosts=(req,res,next)=>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id username")
        .then(mypost=>{
            return res.json({mypost});
        })
}