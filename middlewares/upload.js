import multer from "multer";
import path from "node:path";
import { nanoid } from 'nanoid';

const tempPath = path.resolve("temp");

const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempPath);
    },
    filename: (req, file, cb) => {
        nanoid()
        const tmpName = nanoid();
        cb(null, tmpName);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 10 // 10MB
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("image")) {
        cb(null, true);
        return;
    }
    cb(null, false);
}

const upload = multer({
    storage: tempStorage,
    limits,
    fileFilter,
});

export default upload;