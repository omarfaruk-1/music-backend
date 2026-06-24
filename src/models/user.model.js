import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Username is required"],
        unique:[true,"Username must be unique"]
    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        select:false
    },
    role:{
        type:String,
        enum:["user","artist"],
        default:"user"
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema);

export default userModel;