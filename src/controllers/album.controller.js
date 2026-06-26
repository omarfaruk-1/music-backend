import albumModel from "../models/album.model.js";


async function createAlbum(req,res){
    try {
        const {title,musics}= req.body;
        if(!title || !musics) return res.status(400).json({message:"Title or music id is required"});
        const album= await albumModel.create({
            title:title,
            musics:musics,
            artist:req.user._id,
        })

        res.status(201).json({
            message:"Album create successfully",
            id:album._id,
            title:album.title,
            musics:album.musics,
            artist:album.artist

        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function getAllAlbum(req,res){
    try {
        
    } catch (error) {
        
    }
}

export default {createAlbum,}