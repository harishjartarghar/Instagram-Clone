const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    username:{type:String, required:[true,'Username is required'] , unique: [true, 'username exist']},
    email:{type :String,required:[true,'email is required'],  unique: true},
    password:{type:String,required:[true,'password is required'], expires:60},
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