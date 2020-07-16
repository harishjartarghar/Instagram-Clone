const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    username:{type:String, required:[true,'Username is required'] , unique: [true, 'username exist']},
    email:{type :String,required:[true,'email is required'],  unique: true},
    fullName:{type:String,required:[true,'Full Name is required']},
    password:{type:String,required:[true,'password is required'], expires:60},
    profile:{type:String,default:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"},
    Date: {
        type:Date,
        default:Date.now()
    }
},
{
    timestamp:true
}
);

const User=mongoose.model('User',UserSchema);

module.exports=User;