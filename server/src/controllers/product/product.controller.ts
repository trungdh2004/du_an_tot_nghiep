import { Request, Response } from "express";
import STATUS from "../../utils/status";
import ProductModel from "../../models/products/Product.schema";
import CategoryModel from "../../models/products/Category.schema";


class ProductController {
    async addProduct(req: Request, res: Response) {
        try {

            console.log("hihi");
            
            const product = await ProductModel.create(req.body)
            await CategoryModel.findByIdAndUpdate(req.body.category, {
                $push: {
                    products: product._id
                }
            },{new:true})

            return res.status(STATUS.OK).json(product)
        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message:error.message
            })
        }
    }
}

export default new ProductController();