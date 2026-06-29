import playlistModel from "../models/playlist.model.js";
import storageService from "../services/storage.service.js";


async function createPlayList(req,res){

    try{
        const {title,description,isPublic}=req.body;
        if(!title || !description || isPublic===undefined){
            return res.status(400).json({message:"All fields are required"});
        }
        const coverImage=req.file;
        if(!coverImage){
            return res.status(400).json({message:"Cover image is required"});
        }
        const playlist= await playlistModel.findOne({title:title,user:req.user._id});
        if(playlist){
            return res.status(400).json({message:"Playlist already exists"});
        }
        const coverImageUrl= await storageService.uploadCoverImage(coverImage.buffer.toString("base64"));
        console.log("coverImageUrl",coverImageUrl);
        if(!coverImageUrl){
            return res.status(400).json({message:"Cover image upload failed"});
        }
        const newPlaylist= await playlistModel.create({
            title,
            description,
            user:req.user._id,
            coverImage: coverImageUrl.url,
            isPublic,
        });
        res.status(201).json({
            message:"Playlist created successfully",
            playlist:newPlaylist
        })
    }catch(error){
        res.status(500).json({message:"Internal server error: "+error.message});
    }
}
async function addMusicToPlaylist(req,res){
    try{
        const {playlistId,musicId}=req.params;
        if(!playlistId || !musicId){
            return res.status(400).json({message:"All fields are required"});
        } 
        const playlist= await playlistModel.findById(playlistId);
        if(!playlist){
            return res.status(404).json({message:"Playlist not found"});
        }
        if(playlist.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to add music to this playlist"});
        }
        if(playlist.musics.includes(musicId)){
            return res.status(400).json({message:"Music already exists in the playlist"});
        }
        playlist.musics.push(musicId);
        await playlist.save();
        res.status(200).json({  
            message:"Music added to playlist successfully",
            playlist
        })
    }catch(error){  
        return res.status(500).json({message:"Internal server error: "+error.message});
    }
}
async function getMyPlaylists(req,res){
    try{
        const playlists= await playlistModel.find({user:req.user._id}).populate("musics");
        if(playlists.length===0){
            return res.status(404).json({message:"No playlists found"});
        }
        
        res.status(200).json({
            message:"Playlists fetched successfully",
            playlists
        })
       
    }catch(error){
        return res.status(500).json({message:"Internal server error: "+error.message});
    }
}
async function getAllPlaylists(req,res){
    try{
        const playlists= await playlistModel.find({isPublic:true}).populate("musics");
        if(playlists.length===0){
            return res.status(404).json({message:"No playlists found"});
        }
        res.status(200).json({
            message:"Playlists fetched successfully",
            playlists
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error: "+error.message});
    }
}
async function getPlaylistById(req,res){
    try{
        const {playlistId}=req.params;  
        const playlist= await playlistModel.findById(playlistId).populate("musics");
        if(!playlist){
            return res.status(404).json({message:"Playlist not found"});
        }  
        if(playlist.isPublic===false && playlist.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to view this playlist"});
        }
        res.status(200).json({
            message:"Playlist fetched successfully",
            playlist
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error: "+error.message});
    }   
}
async function updatePlaylist(req,res){
    try{
        const {playlistId}=req.params;
        const {title, description,isPublic} = req.body;
        const coverImage=req.file;
        const allowedUpdates=["title","description","coverImage","isPublic"];
        // const playlist = await playlistModel.findByIdAndUpdate(playlistId, {name, description, coverImage, isPublic}, {new: true});
        const playlist = await playlistModel.findById(playlistId);
        if(!playlist){
            return res.status(404).json({message:"Playlist not found"});
        }
        if(playlist.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to update this playlist"});
        }
        allowedUpdates.forEach((field)=>{
            if(req.body[field] !== undefined){
                playlist[field]=req.body[field];
            }   
        });
        await playlist.save();  
    
        res.status(200).json({
            message:"Playlist updated successfully",
            playlist
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error: "+error.message});
    }
}
async function deletePlaylist(req,res){
    try{
        const {playlistId}=req.params;  
        const playlist= await playlistModel.findById(playlistId);
        if(!playlist){
            return res.status(404).json({message:"Playlist not found"});
        }
        if(playlist.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to delete this playlist"});
        }
        await playlist.remove();
        res.status(200).json({
            message:"Playlist deleted successfully"
        })
    }catch(error){
        return res.status(500).json({message:"Internal server error: "+error.message});
    }
}
export default {  createPlayList, addMusicToPlaylist, getMyPlaylists, getAllPlaylists, getPlaylistById, updatePlaylist, deletePlaylist } 