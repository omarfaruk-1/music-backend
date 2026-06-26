import mongoose from "mongoose";


const albumSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"musics",
        required:true
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const albumModel = mongoose.model("albums",albumSchema);

export default albumModel;