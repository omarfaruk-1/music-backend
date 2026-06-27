import albumModel from "../models/album.model.js";
import musicModel from "../models/music.model.js";


async function createAlbum(req,res){
    try {
        const {title}= req.body;
        if(!title) return res.status(400).json({message:"Title is required"});
        
        const album= await albumModel.create({
            title:title,
            artist:req.user._id,
        })

        res.status(201).json({
            message:"Album create successfully",
            id:album._id,
            title:album.title,
            artist:album.artist

        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function getAllAlbum(req,res){
    try {
        const album = await albumModel.find().populate("artist");
        
        if(album.length ===0) return res.status(404).json({message:"Album not found"});
        res.status(200).json({
            message:"Fetched album successfully", 
            album,
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function getAlbumById(req,res){
    try {
        const {albumId}=req.params;
        const album = await albumModel.findById(albumId).populate("artist").populate("musics");
        if(!album) return res.status(404).json({message:"Album not found"});

        res.status(200).json({
            message:"Album fetched successfully",
            id:album._id,
            title:album.title,
            musics:album.musics,
            artist:album.artist
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+ error.message})
    }
}

async function getMyAlbum(req,res){
    try {
        const userId= req.user._id;
        const album = await albumModel.find({artist:userId}).populate("artist");
        if(album.length === 0) return res.status(404).json({message:"Album not found"});

        res.status(200).json({
            message:"Successfully fetched your album",
            count:album.length,
            album,
            artist:album.artist
        })
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function updateAlbumTitle(req,res){
  try {
      const {albumId}=req.params;
        const {title} = req.body;
        if(!title) return res.status(400).json({message:"Title is required"});
        const album = await albumModel.findById(albumId);
        if(!album) return res.status(404).json({message:"Album not found"});

        if(req.user._id.toString()!== album.artist.toString()){
            return res.status(403).json({message:"You can not update other artist album"})
        }
        album.title=title;
        await album.save();
        res.status(200).json({
            message:"Album title update successfully",
            id:album._id,
            title:album.title,
            musics:album.musics,
            artist:album.artist
        })
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+error.message})
  }
}

async function deleteAlbum(req,res){
    try {
        const {albumId}=req.params;
        const album=await albumModel.findById(albumId)
        if(!album) return res.status(404).json({
            message:"Album not found"
        });

        if(req.user._id.toString()!== album.artist.toString()){
            return res.status(403).json({
                message:"You are not allowed to delete this album"
            })
        };
        await album.deleteOne();

        res.status(200).json({
            message:"Album deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }

}

async function addMusic(req,res){
    try {
        const {musicIds}=req.body;
        const {albumId}=req.params;
        const album = await albumModel.findById(albumId).populate("artist").populate("musics");
        if(!album) return res.status(404).json({message:"Album not found"});

        if(req.user._id.toString() !==album.artist.toString()){
            return res.status(403).json({message:"You are not allowed to add other owner album"})
        };
        const musics = await musicModel.find({
            _id:{$in:musicIds}
        });
        if(musics.length !== musicIds.length) return res.status(400).json({message:"One or more music id not found"});

        const hasOtherArtistMusic = musics.some((music)=>{
            return music.artist.toString() !== req.user._id.toString();
        });
        if(hasOtherArtistMusic) return res.status(403).json({message:"You can only add your own music"});

        const duplicate = musicIds.some((id)=> album.musics.some((musicId)=>musicId.toString()===id));
        if(duplicate) return res.status(400).json({message:"One or more music already exists in this album"});

        album.musics.push(...musicIds);
        await album.save();


        await album.populate("artist","username email").populate("musics","title description genre uri")
        res.status(200).json({
            message:"Music add successfully",
            id:album._id,
            title:album.title,
            artist:album.artist,
            musics:artist.musics
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function removeMusic(req,res){
    try {
        const {albumId,musicId}=req.params;
        if(!albumId || !musicId) return res.status(400).json({message:"Album id or music id are required"});
        const album = await albumModel.findById(albumId);
        if(!album) return res.status(404).json({message:"Album not found"});

        if(album.artist.toString()!== req.user._id.toString()){
            return res.status(403).json({message:"You are not allowed to remove music"})
        };

        const existMusic = album.musics.some((id)=>id.toString()===musicId);
        if(!existMusic){
            return res.status(404).json({
                message: "Music not found in album"
            });
        }
        album.musics=album.musics.filter((id)=>id.toString() !== musicId);
        await album.save();

        await album.populate("artist","username email").populate("musics","title description genre uri")
        res.status(200).json({
            message:"Music removed successfully",
            id:album._id,
            title:album.title,
            artist:album.artist,
            musics:artist.musics
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error"+error.message})
    }
}

export default {createAlbum,getAllAlbum,getMyAlbum,getAlbumById,updateAlbumTitle,deleteAlbum,addMusic,removeMusic}