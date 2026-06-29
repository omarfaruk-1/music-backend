import imageKit from "@imagekit/nodejs";
import appConfig from "../configs/appConfig.js";

const ImageKitClient = new imageKit({
    privateKey:appConfig.IMAGE_KIT_PRIVATE_KEY,
    publicKey:appConfig.IMAGE_KIT_PUBLIC_KEY,
    imageKitEndPoint:appConfig.IMAGE_KIT_ENDPOINT,
})

async function uploadFile(file){
    const result = await ImageKitClient.files.upload({
        file,
        fileName:"music_"+ Date.now(),
        folder:"sportzfy/music"
    })
    return result;
}
async function uploadCoverImage(file){
    const result = await ImageKitClient.files.upload({
        file,
        fileName:"cover_"+ Date.now(),
        folder:"sportzfy/cover"
    })
    return result;
}

export default {uploadFile, uploadCoverImage};