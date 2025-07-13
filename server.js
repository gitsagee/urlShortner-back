import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import route from "./routes/routes.js";
import authRoutes from "./routes/auth.js";
// import authorize from "./middleware/authorize.js";
import cors from "cors";


dotenv.config();
dbConnect();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/",route);
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`server connected at ${process.env.PORT}`);
    }
})
