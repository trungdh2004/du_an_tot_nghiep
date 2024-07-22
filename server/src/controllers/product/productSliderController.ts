import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import { productSliderValidation } from "../../validation/product.validation";
import ProductSliderModel from "../../models/products/ProductSlider";
import { IProductSlider } from "../../interface/product";

class ProductSliderController {
  async addProductSlider(req: RequestModel, res: Response) {
    try {
      const { error } = productSliderValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { title, label, product, index, colorCode, thumbnail } = req.body;

      const productSlider = await ProductSliderModel.create({
        title,
        label,
        product,
        index,
        colorCode,
        thumbnail,
      });

      return res.status(STATUS.OK).json({
        message: "Tạo thành công",
        data: productSlider,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateProductSliderById(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn giá trị",
        });

      const { error } = productSliderValidation.validate(req.body);
      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }
      const { title, label, product, index, colorCode, thumbnail } = req.body;

      const existingProductSlider = await ProductSliderModel.findById(id);

      if (!existingProductSlider)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị",
        });
      const productSlider = await ProductSliderModel.findByIdAndUpdate(
        id,
        {
          title,
          label,
          product,
          index,
          colorCode,
          thumbnail,
        },
        { new: true }
      );

      return res.status(STATUS.OK).json({
        message: "Sửa thành công",
        data: productSlider,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateIndexProductSlider(req: RequestModel, res: Response) {
    try {
      const { data }: { data: IProductSlider[] } = req.body;

      const checkIndex = data?.some(
        (item) => item.index === undefined || item.index === null
      );

      if (checkIndex)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa đánh vị trí cho phần tử",
        });

      const bulkOps = data.map((item) => {
        return {
          updateOne: {
            filter: { _id: item._id as string },
            update: { index: item.index },
          },
        };
      });

      await ProductSliderModel.bulkWrite(bulkOps);

      return res.status(STATUS.OK).json({
        message: "Chỉnh sửa vị trí thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteProductSlider(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Chưa chọn giá trị",
        });

      const existingProductSlider = await ProductSliderModel.findById(id);

      if (!existingProductSlider)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị thỏa mãn",
        });

      await ProductSliderModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async getProductSlider(req: RequestModel, res: Response) {
    try {
      const listProduct = await ProductSliderModel.find().sort({ index: 1 }).populate("product")
      
      return res.status(STATUS.OK).json({
        message: "Lấy thành công",
        data: listProduct
      })
    } catch (error:any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  } 
}

export default new ProductSliderController();
