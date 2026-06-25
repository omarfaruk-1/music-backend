import mongoose from "mongoose";


const musicSchema = new mongoose.Schema({
    uri:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
},{timestamps:true});

const musicModel = mongoose.model("musics",musicSchema);


export default musicModel;