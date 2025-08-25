import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "project-flow",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
    },
  }),
}).single("attachment");

export { upload };
