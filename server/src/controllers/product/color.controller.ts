import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import { colorValidation } from "../../validation/product.validation";
import ColorModel from "../../models/products/Color.schema";
import { formatDataPaging } from "../../common/pagingData";

class ColorController {
  async addColor(req: RequestModel, res: Response) {
    try {
      const { error } = colorValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { name, code } = req.body;

      const newColor = await ColorModel.create({
        name,
        code,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo màu thành công",
        data: newColor,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async pagingColor(req: RequestModel, res: Response) {
    try {
      const { pageIndex, pageSize } = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * pageSize || 0;

      const dataColor = await ColorModel.find().limit(limit).skip(skip);
      const countColor = await ColorModel.countDocuments();

      const result = formatDataPaging({
        limit,
        pageIndex,
        data: dataColor,
        count: countColor,
      });

      return res.status(STATUS.OK).json(result);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getColorById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn Color",
        });
      }

      const ColorData = await ColorModel.findById(id);

      if (!ColorData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có Color thỏa mãn",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: ColorData,
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
          message: "Bạn chưa chọn Color",
        });
      }

      const ColorData = await ColorModel.findById(id);

      if (!ColorData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có Color thỏa mãn",
        });
      }

      await ColorModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateColor(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      const { error } = colorValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn Color",
        });
      }

      const ColorData = await ColorModel.findById(id);

      if (!ColorData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có Color thỏa mãn",
        });
      }

      const newColor = await ColorModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(STATUS.OK).json({
        message: "Thay đổi thành công",
        data: newColor,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new ColorController();
