import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Request, Express } from "express";
import multer, { FileFilterCallback } from "multer";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shopApp",
    transformation: (req: Request, file: Express.Multer.File) => {
      const { width, height } = req.query;
      return [
        {
          width: width ? +width : "",
          height: height ? +height : "",
          crop: "scale",
          quality:"good"
        },
      ];
    },
  },
  filename: function (req: Request, file: any, cb: FileFilterCallback) {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;
