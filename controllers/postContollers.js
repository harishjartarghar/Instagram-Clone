const Post = require('../models/post');

exports.CreatePost= async (req,res,next)=>{
    const {caption,location,photo}=req.body;
    if(!photo) return res.status(422).json({message:"upload image"});
    const post=new Post({caption,location , photo , postedBy:req.user});
    try { 
        post.save()
            .then((post)=>{
                return res.status(201).json({message:"new posted created sucessfully!"});
            })
            .catch((error)=>{
                console.log(error);
                return res.status(422).json({message:'something went wrong, try after sometime'});
            })
    } catch (error) {

        return res.status(400).json({error});
    }
}


exports.getAllPosts=(req,res,next)=>{
    Post.find()
        .populate("postedBy","_id username")
        .then(allpost=>{
            return res.status(200).json({allpost});
        })
}


exports.getMyPosts=(req,res,next)=>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id username")
        .then(mypost=>{
            return res.status(200).json({mypost});
        })
}

exports.LikePost=(req,res,next)=>{
    Post.findByIdAndUpdate(req.body.postID,{$push:{likes:req.user._id}},{new:true})
        .exec((error,result)=>{
            if(error) return res.status(422).json({error});

            return res.status(200).json({result});
        });
}

exports.UnLikePost=(req,res,next)=>{
    Post.findByIdAndUpdate(req.body.postID,{$pull:{likes:req.user._id}},{new:true})
        .exec((error,result)=>{
            if(error) return res.status(422).json({error});

            return res.status(200).json({result});
        });
}