import multer from "multer";

const upload= multer({
    storage:multer.memoryStorage()
})

const uploadMusic = upload.single("music")
export default uploadMusic;

