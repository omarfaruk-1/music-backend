import musicModel from "../models/music.model.js";
import favoriteModel from "../models/favorite.model.js";


async function createFavoriteMusicList(req,res){
    try {
        const {musicId}=req.params;
        const music = await musicModel.findById(musicId);
        if(!music) return res.status(404).json({message:"Music not found"})
        const existFavorite = await favoriteModel.findOne({user:req.user._id,music:musicId});
        if(existFavorite) return res.status(409).json({message:"Music already exist in favorite list"})
        const favorite = await favoriteModel.create({
            user:req.user._id,
            music:musicId
        });
        res.status(201).json({
            message:"Music added on favorite list",
            id:favorite._id,
            favorite:favorite.music
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function getFavoriteMusic(req,res){
    try {
        const favorite = await favoriteModel.find({user:req.user._id}).populate("music");
        if(favorite.length===0) return res.status(200).json({message:"You have not favorite music",favorite:[]});
        res.status(200).json({
            message:"Your favorite musics",
            favorite
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function removeFavoriteMusic(req,res){
    try {
        const {musicId}=req.params;
        const favorite = await favoriteModel.findOneAndDelete({user:req.user._id,music:musicId});
        if(!favorite) return res.status(404).json({message:"Favorite music not found"});
        res.status(200).json({
           message:"Favorite music removed successfully" 
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

export default {createFavoriteMusicList,getFavoriteMusic,removeFavoriteMusic}