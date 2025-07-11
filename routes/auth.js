import express from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoutes=express.Router();

authRoutes.post("/signup",async (req,res)=>{
    try{
    const {username,password , name} = req.body;
    if(!username  || !name){
        return res.status(400).json({error : "username and displayname is required "});
    }
    if(await User.findOne({username})){
        return res.status(400).json({error : "username should be unique "});
    }
    if(!password || password.length<=4 ){
        return res.status(400).json({error : "password is required && should be of 5 length atleast"});
    }
    const newUser= new User({username,password,name});
    const details=await newUser.save();
    console.log(details);
    return res.status(201).json({message : "successfully registered"});}
    catch(err){
        console.log(err);
        return res.status(500).json({error :"Internal server error"});
    }
})
authRoutes.post("/login",async (req,res)=>{
    try{
        const {username , password}=req.body;
        if(!username || !password){
            return res.status(400).json({error:"username && password both are required "});
        }
        const existing= await User.findOne({username});
        if(!existing){
            return res.status(400).json({error:"username doesnt exists"});
        }
        const hashedPassword = existing.password;
        const verify= await bcrypt.compare(password,hashedPassword);
        
        if(verify){
            //will use .redirect once checked
            const token=jwt.sign({id:existing._id},process.env.JWT_SECRETKEY,{expiresIn:"1h"});
            return res.status(200).json({message:"logged in successfully",token});


        }else{
            return res.status(401).json({error :"wrong password"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }

    }
)
export default authRoutes;