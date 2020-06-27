const mongoose=require('mongoose');
const {ObjectId}=mongoose.SchemaType;

const postSchema=mongoose.Schema({
    caption:{type:String},
    location:{type:String},
    photo:{type:String,required:[true,'photo is required']},
    postedBy:{type:ObjectId,ref:"User"}
},{timestamp:true})

const Post=mongoose.model('Post',postSchema);

module.exports=Post;