import express from "express";
import url from "../models/urlSchema.js";

const route = express.Router();
route.get('/favicon.ico', (req, res) => res.status(204).end());

route.get('/:id',async (req,res)=>{
    const id=req.user.id;
    const newUrl=req.params.id;
    if(!newUrl){
        return res.status(400).json({error :"url required"})
    }
    console.log(newUrl);
    const foundUrl= await url.findOne({newUrl});
    if(!foundUrl || foundUrl.owner!=id){
        return res.status(400).json({error :"url not found"});
    }
    foundUrl.clickedTimes+=1;
    await foundUrl.save();
    return res.status(200).redirect(foundUrl.url);
    
})
route.post('/',async (req,res)=>{
    const id=req.user.id;
    const {originalUrl}=req.body;
    if (!originalUrl) {
        return res.status(400).json({ error: "originalUrl is required" });
    }
    if(!originalUrl.startsWith("https://") && (!originalUrl.startsWith("http://"))){
        return res.status(400).json({error: "invalid url"});
    }
    const saved =await url.create({
        url:originalUrl,
        owner:id
    })
    return res.status(200).json(saved);

})
export default route;