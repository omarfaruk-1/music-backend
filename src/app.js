import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import musicRoute from './routes/music.route.js';
import albumRoute from './routes/album.route.js';
import playlistRoute from './routes/playlist.route.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/music",musicRoute)
app.use("/api/album",albumRoute)
app.use("/api/playlists",playlistRoute)


export default app;