import mongoose from "mongoose";


const albumSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    musics:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"musics"
        }],
        default:[]
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const albumModel = mongoose.model("albums",albumSchema);

export default albumModel;