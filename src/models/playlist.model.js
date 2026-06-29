import mongoose from "mongoose";

const playlistSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"musics"
    }],
    coverImage:{
        type:String,
        required:true
    },
    isPublic:{
        type:Boolean,
        required:true,
    }
},{
    timestamps:true
})

const playlistModel = mongoose.model("playlists",playlistSchema);
export default playlistModel;