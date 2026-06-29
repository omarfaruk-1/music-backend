
import musicModel from "../models/music.model.js";
import storageService from "../services/storage.service.js";

async function createMusic(req, res) {
  try {
    const { title,description,genre} = req.body;
    const file = req.file;
    if(!file || !title || !description || !genre ) return res.status(400).json({message:"All fields required"});
    
    const result = await storageService.uploadFile (file.buffer.toString("base64"));
    if(!result) return res.status(400).json({message:"File upload failed"});

    const music = await musicModel.create({
      uri: result.url,
      title: title,
      description:description,
      genre:genre,
      artist: req.user._id,
    });

    res.status(201).json({
      message: "Music upload successfully",
      music: {
        userId:req.user._id,
        musicId: music._id,
        title: music.title,
        description:music.description,
        genre:music.genre,
        url: music.uri,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error: "+ error.message,
    });
  }
}

async function getAllMusic(req,res){
  try {
    const music = await musicModel.find();
    if(music.length===0) return res.status(404).json({message:"Music not found"});

    res.status(200).json({
      message:"All music fetched successfully",
      count:music.length,
      music
    })
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+error.message})
  }
}

async function getMusicById(req,res){
  try {
    const {musicId}=req.params;
    const music = await musicModel.findById(musicId);
    if(!music) return res.status(404).json({message:"Music not found"})
    
    res.status(200).json({
      message:"Successfully fetched",
      music:{
        musicId:music._id,
        title:music.title,
        description:music.description,
        genre:music.genre,
        uri:music.uri,
        artist:music.artist
      }
    })
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+ error.message})
  }
}

async function getArtistMusic(req,res){
  try {
    const userId = req.user._id;
    const music = await musicModel.find({artist:userId});
    if(music.length===0) return res.status(404).json({message:"Music not found"});

    res.status(200).json({
      message:"Successfully fetched artist music",
      count:music.length,
      music
    })
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+error.message})
  }
}

async function updateMusic(req,res){
  try {
    const {musicId}=req.params;
    const allowedUpdates=["title","description","genre"];

    const music = await musicModel.findById(musicId);
    if(!music) return res.status(404).json({message:"Music not found"});

    if(music.artist.toString()!==req.user._id.toString()){
      return res.status(403).json({message:"Forbidden"})
    }

    allowedUpdates.forEach((field)=>{
      if(req.body[field] !== undefined){
        music[field]=req.body[field];
      }
    })

    await music.save()

    res.status(200).json({
      message:"Music update successfully",
      music:{
        musicId:music._id,
        title:music.title,
        description:music.description,
        genre:music.genre,
        uri:music.uri,
        artist:music.artist
      }
    })
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+error.message})
  }
}

async function deleteMusic(req,res){
  try {
    const {musicId}=req.params;
    const music= await musicModel.findById(musicId);
    if(!music) return res.status(404).json({message:"Music not found"});
    if(music.artist.toString()!==req.user._id.toString()){
      return res.status(403).json({message:"Forbidden"})
    }
    await music.deleteOne();

    res.status(200).json({message:"Music delete successfully"});
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+ error.message})
  }
  
}

export default {createMusic,getAllMusic,getMusicById,getArtistMusic,deleteMusic,updateMusic};
