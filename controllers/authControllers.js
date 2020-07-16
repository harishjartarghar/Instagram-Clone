const User = require("../models/user");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {auth_token}=require('../config/keys');

exports.CreateUser= async (req,res,next)=>{
    const {username,email,password,fullName}=req.body;
    if(!username && !email && !password && !fullName) return res.status(422).json({message:"Enter All Fields"}) ;
    if(!username) return res.status(422).json({message:"Enter username"}) ;
    if(!email) return res.status(422).json({message:"email is required"}) ;
    if(!fullName) return res.status(422).json({message:"Enter Full Name"}) ;
    if(!password) return res.status(422).json({message:"Enter password"}) ;


    var userRegex=/^[a-zA-Z0-9]+$/;
    var emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
    if(!userRegex.test(username) || username.length<3) return res.status(422).json({message:"username should contain only letters, digits ,underscore and min 3 chars"}) ;
    if(!emailRegex.test(email)) return res.status(422).json({message:"enter a valid email"}) ;
    if(!passwordRegex.test(password)) return res.status(422).json({message:"password should contain atleast one uppercase, one lowercase, one digit, one special char and min of 6 chars"}) ;
    //hashing password
    const salt=await bcrypt.genSalt(12);
    const hashedpassword=await bcrypt.hash(password,salt);

    const user=new User({username,email,fullName,password:hashedpassword});
    try {
        user.save()
            .then(()=>{
                return res.status(201).json({
                    success:true,
                    data:user,
                    message:"Congrats! Account created Successfully"
                });
            })
            .catch(error=>{
                if(error.name === 'MongoError' && error.code === 11000)
                { 
                  if(Object.keys(error.keyValue).toString()=='username')
                        return res.status(422).json({message:'username is already registered'}); 
                  if(Object.keys(error.keyValue).toString()=='email')
                        return res.status(422).json({message:'email is already registered'}); 
                }
                return res.status(422).json({message:'Something went wrong, try again'});
            });
    } catch (error) {

        return res.status(422).json({error:error,message:"Something went wrong, try again"});
    }
}



exports.Login=async (req,res,next)=>{

    const {userfield,password}=req.body;

    if(!userfield && !password) return res.status(422).json({message:"Enter All Fields"}) ;
    if(!userfield ) return res.status(422).json({message:"username,or email field is required"}) ;
    if(!password) return res.status(422).json({message:"password is required"}) ;

    const user=await User.findOne({$or: [{email: userfield},{username: userfield}]});
    if(!user) return res.status(422).json({message:'username or email not found!'});

    const passCheck=await bcrypt.compare(password,user.password);
    if(!passCheck) return res.status(422).json({message:'password is incorrect!'});

    const token=jwt.sign({_id:user._id},auth_token);
    const {_id,username,email,profile}=user;
    return res.header('auth-token',token).status(200).json({message:'login successful',token,user:{_id,username,email,profile}});
}



exports.CheckUser=async (req,res,next)=>{

    const {username,email }=req.body;

    const userExist=await User.findOne({username:username});
    if(userExist) return res.status(422).json({message: ` '${username}' is taken ,try another`});

    const userEmailExist=await User.findOne({email:email});
    if(userEmailExist) return res.status(422).json({message: `Entered email is registered, try another`});

    return res.status(200).json({message:'All Ok'});


}