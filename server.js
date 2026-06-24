import "dotenv/config";
import app from "./src/app.js";
import dns from "node:dns/promises";
import connectDB from "./src/db/db.js";
import appConfig from "./src/configs/appConfig.js";

dns.setServers(["1.1.1.1"]);
connectDB();


const PORT= appConfig.PORT;



app.listen(PORT,()=>{
    console.log("Server running port 5000")
})