import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import musicRoute from './routes/music.route.js';
import albumRoute from './routes/album.route.js';
import playlistRoute from './routes/playlist.route.js';
import favoriteRoute from './routes/favorite.route.js';
import historyRoute from './routes/history.route.js';


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users",authRoute);
app.use("/api/musics",musicRoute);
app.use("/api/albums",albumRoute);
app.use("/api/playlists",playlistRoute);
app.use("/api/favorites",favoriteRoute);
app.use("/api/histories",historyRoute);

export default app;