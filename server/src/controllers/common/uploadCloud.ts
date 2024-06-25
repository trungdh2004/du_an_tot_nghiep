import { Request, Response } from "express";

class UploadController {
  uploadSingleFileCloudinary = async (req: Request, res: Response) => {
    try {
      console.log(req.file);

      const file = req.file;

      if (!file) {
        return res.status(401).json({
          message: "Message not found",
        });
      }
      return res.status(200).json(file);
    } catch (error: any) {
      // handle error here
      console.error(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  uploadMultipleFileCloudinary = async (req: Request, res: Response) => {
    try {
      const files = req.files;
      return res.status(200).json(files);
    } catch (error) {}
  };
}

export default new UploadController();
