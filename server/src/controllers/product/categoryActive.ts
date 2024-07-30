import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import {
  categoryActiveValidation,
  productSliderValidation,
} from "../../validation/product.validation";
import { ICategoryActive } from "../../interface/product";
import CategoryActiveModel from "../../models/products/CategoryActive";

class CategoryActiveController {
  async addCategoryActive(req: RequestModel, res: Response) {
    try {
      const { error } = categoryActiveValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { index, category } = req.body;

      const categoryActive = await CategoryActiveModel.create({
        category,
        index,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo thành công",
        data: categoryActive,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
  async updateCategoryActiveById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn giá trị",
        });

        const { index,category } = req.body;
    
        if (!index) {
            return res.status(STATUS.BAD_REQUEST).json({
                message:"Bạn chưa nhập index"
            })
        }

      const existingCategoryActive = await CategoryActiveModel.findById(id);

      if (!existingCategoryActive)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị",
        });
      const CategoryActive = await CategoryActiveModel.findByIdAndUpdate(
        id,
        {
          index,
          category
        },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: "Sửa thành công",
        data: CategoryActive,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
  async deleteCategoryActive(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Chưa chọn giá trị",
        });

      const existingProductSlider = await CategoryActiveModel.findById(id);

      if (!existingProductSlider)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị thỏa mãn",
        });

      await CategoryActiveModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
  async getCategoryActive(req: RequestModel, res: Response) {
    try {
      const listCategoryActive = await CategoryActiveModel.find().sort({index:1}).populate("category")

      return res.status(STATUS.OK).json({
        message: "Lấy thành công",
        data: listCategoryActive,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error?.message,
      });
    }
  }

}

export default new CategoryActiveController();
