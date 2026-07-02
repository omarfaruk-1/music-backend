import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    music:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"musics",
        required:true
    },
},{timestamps:true})

const favoriteModel = mongoose.model("favorites",favoriteSchema);

export default favoriteModel;