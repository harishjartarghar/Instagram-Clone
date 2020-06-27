const jwt=require('jsonwebtoken');
const { auth_token } = require('../config/keys');
const User = require("../models/user");

exports.Verify=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token) return res.status(401).json({msg:"Acess Denied"});

    try {
        
        const verified=jwt.verify(token,auth_token);
        User.findById(verified._id).then(userdata=>{
            req.user = userdata;
            req.user.password=undefined;
            next()
        });

    } catch (error) {
        return res.status(400).json({ msg: 'Token is not valid' ,error:error});
    }
}