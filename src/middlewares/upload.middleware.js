import multer from "multer";

const upload= multer({
    storage:multer.memoryStorage()
})

const uploadMusic = upload.single("music")
const uploadCoverImage = upload.single("coverImage")
export { uploadMusic, uploadCoverImage };
