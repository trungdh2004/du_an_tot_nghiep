import { Request, Response } from "express";
import STATUS from "../../utils/status";
import ProductModel from "../../models/products/Product.schema";
import CategoryModel from "../../models/products/Category.schema";
import { productValidations } from "../../validation/product.validation";
import { IAttribute } from "../../interface/product";

class ProductController {
  async addProduct(req: Request, res: Response) {
    try {
      const { error } = productValidations.validate(req.body);
      console.log("hihi");

      if (error) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: error.details[0].message,
        });
      }

      const {
        name,
        price,
        discount,
        description,
        thumbnail,
        category,
        quantitySold,
        images,
        attributes = [],
      } = req.body;

      // const newProduct = await ProductModel.create({
      //   name,
      //   price,
      //   discount,
      //   description,
      //   thumbnail,
      //   category,
      //   quantitySold,
      //   images,
      // });

      attributes.map((item: IAttribute) => {
        console.log("item:", item);
      });

      return res.status(STATUS.OK).json({
        message: "hề",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new ProductController();
