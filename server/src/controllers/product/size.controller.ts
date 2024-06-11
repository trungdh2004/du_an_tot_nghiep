import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import { sizeValidation } from "../../validation/product.validation";
import SizeModel from "../../models/products/Size.schema";
import { formatDataPaging } from "../../common/pagingData";

class SizeController {
  async addSize(req: RequestModel, res: Response) {
    try {
      const { error } = sizeValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { name, code } = req.body;

      const newSize = await SizeModel.create({
        name,
        code,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo kích thước thành công",
        data: newSize,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async pagingSize(req: RequestModel, res: Response) {
    try {
      const { pageIndex, pageSize } = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * pageSize || 0;

      const dataSize = await SizeModel.find().limit(limit).skip(skip);
      const countSize = await SizeModel.countDocuments();

      const result = formatDataPaging({
        limit,
        pageIndex,
        data: dataSize,
        count: countSize,
      });

      return res.status(STATUS.OK).json(result);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getSizeById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn size",
        });
      }

      const sizeData = await SizeModel.findById(id);

      if (!sizeData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có size thỏa mãn",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: sizeData,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn size",
        });
      }

      const sizeData = await SizeModel.findById(id);

      if (!sizeData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có size thỏa mãn",
        });
      }

      await SizeModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateSize(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      const { error } = sizeValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn size",
        });
      }

      const sizeData = await SizeModel.findById(id);

      if (!sizeData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có size thỏa mãn",
        });
      }

      const newSize = await SizeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(STATUS.OK).json({
        message: "Thay đổi thành công",
        data: newSize,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new SizeController();
