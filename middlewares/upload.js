import multer from "multer";
import path from "node:path";
import { nanoid } from 'nanoid';

const tempPath = path.resolve("temp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tempPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      cb(null, `${base}-${Date.now()}${ext}`);
    },
  });
  
  const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB
  };
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };
  
  const upload = multer({
    storage,
    limits,
    fileFilter,
  });
  
  export default upload;