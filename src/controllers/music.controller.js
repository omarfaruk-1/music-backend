import jwt from "jsonwebtoken";
import appConfig from "../configs/appConfig.js";
import uploadFile from "../services/storage.service.js";
import musicModel from "../models/music.model.js";

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title: title,
      artist: req.user._id,
    });

    res.status(201).json({
      message: "Music upload successfully",
      music: {
        userId:req.user._id,
        musicId: music._id,
        title: music.title,
        url: music.uri,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllMusic(req,res){

  const music = await musicModel.find();

  res.status(200).json({
    message:"All music fetched successfully",
    count:music.length,
    music
  })
}

async function getMusicById(req,res){
  const {musicId}=req.params;
  const music = await musicModel.findById(musicId);
  if(!music) return res.status(404).json({message:"Music not found"})
  
  res.status(200).json({
    message:"Successfully fetched",
    music:{
      musicId:music._id,
      title:music.title,
      uri:music.uri,
      artist:music.artist
    }
  })
}

async function getArtistMusic(req,res){
  const userId = req.user._id;
  const music = await musicModel.find({artist:userId});
  if(music.length===0) return res.status(404).json({message:"Music not found"});

  res.status(200).json({
    message:"Successfully fetched artist music",
    count:music.length,
    music
  })
  
  
}



export default {createMusic,getAllMusic,getMusicById,getArtistMusic};
