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
      const { name, toHeight,fromHeight,toWeight,fromWeight } = req.body;

      const newSize = await SizeModel.create({
        name,
        toWeight,
        fromHeight,
        toHeight,
        fromWeight
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
      const { pageIndex = 1, pageSize,keyword ,tab=1 , height,weight} = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      let pipeline: any[] = [];
      // search
      if (keyword) {
        pipeline.push({
          $match: {
            name: { $regex: keyword, $options: "i" },
          },
        });
      }

      if (height && typeof height === "number") {
        pipeline.push({
          $match: {
            toHeight: { $gte: height },
            fromHeight: { $lte: height },
          }
        })
      }

      if (weight && typeof weight === "number") {
        pipeline.push({
          $match: {
            toWeight: { $gte: weight },
            fromWeight: { $lte: weight },
          }
        })
      }

      if (tab === 1) {
        pipeline.push({
          $match: {
            deleted: false,
          },
        });
      } else if (tab === 2) {
        pipeline.push({
          $match: {
            deleted: true,
          },
        });
      }

      const dataColor = await SizeModel.aggregate(pipeline).collation({
        locale: "en_US",
        strength: 1,
      }).skip(skip).limit(limit)
      const countColor = await SizeModel.aggregate([
        ...pipeline,
        {
          $count:"total"
        }
      ]);

      const result = formatDataPaging({
        limit,
        pageIndex,
        data: dataColor,
        count: countColor[0]?.total || 0,
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
