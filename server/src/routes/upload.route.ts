import { NextFunction, Request, Response, Router } from "express";
import UploadController from "../controllers/common/uploadCloud";
import uploadCloud from "../utils/helper";
const routerUpload = Router();

routerUpload.post(
  "/singleImage",
  uploadCloud.single("image"),
  UploadController.uploadSingleFileCloudinary
);

routerUpload.post(
  "/multipleImage",
  uploadCloud.array("images"),
  UploadController.uploadMultipleFileCloudinary
);

export default routerUpload;
