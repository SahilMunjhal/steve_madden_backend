const express=require("express");
const app=express();
const User=require("../models/user.model");
const jwt =require("jsonwebtoken");

// ---------------------------Token Function-----------------------------

const newToken=(user)=>{
    return jwt.sign({user},"dummy");
}

// -------------------------User Registration----------------------------

const register=async(req,res)=>{
    try{

        let user;
        user=await User.findOne({email:req.body.email}).lean().exec();

        if(user)
        return res.status(400).send({status:0});

        user=await User.create(req.body);

        const token=newToken(user)
        return res.status(200).send({status:1,user})

    }catch(err){
        return res.status(500).send(err.message);
    }
}

// -------------------------User Log-In------------------------------


const login=async(req,res)=>{
    try{
        let user;
        user=await User.findOne({email:req.body.email});
    
        if(!user)
        return res.status(401).send({status:0});
    
        const match=user.checkPassword(req.body.password);
        console.log(match);
    
        if(!match)
        return res.status(402).send({status:1});
        
        const token=newToken(user);
        return res.status(203).send({status:2,user,token});
    }catch(err){
        return res.status(503).send(err.message);
    }   
};

module.exports={register,login,newToken};

