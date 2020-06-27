const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const postSchema=mongoose.Schema({
    caption:{type:String},
    location:{type:String},
    photo:{type:String},
    postedBy:{type:ObjectId,ref:"User"}
},{timestamp:true});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;