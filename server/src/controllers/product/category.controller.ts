import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import { categoryValidation } from "../../validation/product.validation";
import { formatDataPaging } from "../../common/pagingData";
import CategoryModel from "../../models/products/Category.schema";

class categoryController {
  async addCategory(req: RequestModel, res: Response) {
    try {
      const { error } = categoryValidation.validate(req.body);
      if (error) {
        console.log("error", error);

        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { name, description } = req.body;

      const newCategory = await CategoryModel.create({
        name,
        description,
      });
      return res.status(STATUS.OK).json({
        message: "Tạo loại thành công",
        data: newCategory,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }


  async pagingCategory(req: RequestModel, res: Response) {
    try {
      const { pageIndex = 1, pageSize } = req.body;

      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      const dataCategory = await CategoryModel.find()
        .limit(limit)
        .skip(skip);
      const countCategory = await CategoryModel.countDocuments();
      const result = formatDataPaging({
        limit,
        pageIndex,
        data: dataCategory,
        count: countCategory,
      });

      return res.status(STATUS.OK).json(result);
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }


  async getAllCategory(req: RequestModel, res: Response) {
    try {
      console.log("hihi");

      const allCategory = await CategoryModel.find();
      console.log("2");

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: allCategory,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }


  async getCategoryById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn Brand",
        });
      }

      const CategoryData = await CategoryModel.findById(id);

      if (!CategoryData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có loại sản phẩm thỏa mãn",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: CategoryData,
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
          message: "Bạn chưa chọn loại sản phẩm",
        });
      }

      const CategoryData = await CategoryModel.findById(id);

      if (!CategoryData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có loại sản phẩm thỏa mãn",
        });
      }

      await CategoryModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateCategory(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      const { error } = categoryValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn Category",
        });
      }

      const CategoryData = await CategoryModel.findById(id);

      if (!CategoryData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có Category thỏa mãn",
        });
      }

      const newCategory = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(STATUS.OK).json({
        message: "Thay đổi thành công",
        data: newCategory,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getCategoryBySlug(req: RequestModel, res: Response) {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn Brand",
        });
      }

      const CategoryData = await CategoryModel.findOne({ slug: slug });

      if (!CategoryData) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có loại sản phẩm thỏa mãn",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: CategoryData,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new categoryController();
