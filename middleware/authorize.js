import express from "express";
import jwt from "jsonwebtoken";

const authorize =(req,res,next)=>{
    try{
    const header =req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
        return res.status(400).json({error :"jwt token missing"});
    }
    const token = header.split(" ")[1];
    const decoded =jwt.verify(token , process.env.JWT_SECRETKEY);
    req.user=decoded;
    next();
}
    catch(err){
        return res.status(500).json({error: "Internal Server Error",err});
    }
}
export default authorize;