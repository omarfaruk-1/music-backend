import mongoose from "mongoose";


const historySchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    music:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"musics",
        required:true
    }
},{timestamps:true});

const historyModel= mongoose.model("histories",historySchema);
export default historyModel;