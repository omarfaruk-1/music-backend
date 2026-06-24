import mongoose from "mongoose";
import appConfig from "../configs/appConfig.js";

export async function connectDB(){
    try{
        await mongoose.connect(appConfig.DB_URI);
        console.log("DB connected")
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

export default connectDB;