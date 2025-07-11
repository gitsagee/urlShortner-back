import  mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username : {type : String , required : true},
    password : {type : String , required : true},
    name : {type : String , required : true}
})
userSchema.pre("save",async function(){
    if(this.isModified("password")){
        const salt=10;
        this.password=await bcrypt.hash(this.password,salt);
    }
})
const user = mongoose.model("user",userSchema);
export default user;