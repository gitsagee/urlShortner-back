import mongoose from "mongoose";
import {nanoid} from "nanoid";
const urlSchema = new mongoose.Schema({ 
    url : String,
    newUrl : String,
    createdAt : {type :Date, default : Date.now },
    clickedTimes :{ type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
 });

urlSchema.pre('save',async function(){
    if(!this.newUrl){
        this.newUrl= nanoid(6);

    }

})
const url =new mongoose.model("url",urlSchema);

export default url;