const User = require("../models/user");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {auth_token}=require('../config/keys');

exports.CreateUser= async (req,res,next)=>{
    const {username,email,password}=req.body;

    //hashing password
    const salt=await bcrypt.genSalt(12);
    const hashedpassword=await bcrypt.hash(password,salt);

    const user=new User({username,email,password:hashedpassword});
    try {
        user.save()
            .then(()=>{
                return res.status(201).json({
                    success:true,
                    data:user
                });
            })
            .catch(error=>{
                return res.status(400).json({error});
            });
    } catch (error) {

        return res.status(400).json({error});
    }
}



exports.Login=async (req,res,next)=>{

    const {userfield,password}=req.body;

    const user=await User.findOne({$or: [{email: userfield},{username: userfield}]});
    if(!user) return res.status(400).json({error:'username or email not found!'});

    const passCheck=await bcrypt.compare(password,user.password);
    if(!passCheck) return res.status(400).json({error:'password is incorrect!'});

    const token=jwt.sign({_id:user._id},auth_token);
    return res.header('auth-token',token).status(200).json({message:'login successful'})
}



exports.CheckUser=async (req,res,next)=>{

    const {username,email }=req.body;

    const userExist=await User.findOne({username:username});
    if(userExist) return res.status(400).json({message: username+' already exist'});

    const userEmailExist=await User.findOne({email:email});
    if(userEmailExist) return res.status(400).json({message: 'email already exist'});

    return res.status(200).json({message:'All Ok'});


}