const express=require("express");
const router=express.Router();
const Cart=require("../models/cartmodel");

router.post("",async(req,res)=>{
    try{
        console.log(req.body);
        let cart=await Cart.create(req.body);
        console.log(cart);
        return res.status(205).send(cart);
    }catch(err){
        return res.status(505).send(err.message);
    }
});

router.get("",async(req,res)=>{
    try{
        const carts=await Cart.find().lean().exec();
        return res.status(206).send(carts);
    }catch(err){
        return res.status(506).send(err.message);
    }
});

router.get("",async(req,res)=>{
    try{
        const cart=await Cart.findOne().lean().exec();
        return res.status(206).send(cart);
    }catch(err){
        return res.status(506).send(err.message);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const cart=await Cart.findOne(req.params.id).lean().exec();
        return res.status(206).send(cart);
    }catch(err){
        return res.status(506).send(err.message);
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const cart=await Cart.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(206).send(cart);
    }catch(err){
        return res.status(506).send(err.message);
    }
});

module.exports=router;