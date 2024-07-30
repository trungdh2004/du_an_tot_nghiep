import { Response,ErrorRequestHandler } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import CartModel from "../../models/cart/Cart.schema";
import { cartItemValidation } from "../../validation/cart.validation";
import CartItemModel from "../../models/cart/CartItem.schema";

class CartController {
    pagingCart(req: RequestModel, res: Response) {
        try {
            const user = req.user

            
        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message:error.message
            })
        }
    }
    async addProductToCart(req: RequestModel, res: Response) {
        try {
            const user = req.user;

            const { error } = cartItemValidation.validate(req.body);

            if (error) {
              return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
              });
            }

            const { productId,quantity,attribute} = req.body;

            if(!user) return res.status(STATUS.AUTHORIZED).json({
                message:"Bạn chưa đăng nhập"
            })

            let existingCart = await CartModel.findOne({
                user:user?.id
            })

            if(!existingCart) {
                existingCart = await CartModel.create({
                    user:user.id,
                })
            }

            await CartItemModel.create({
              product: productId,
              quantity,
              attribute,
            });

            return res.status(STATUS.OK).json({
                message:"Thêm thành công"
            })

        } catch (error:any) {
            return res.status(STATUS.INTERNAL).json({
                message:error.message
            })
        }
    }

    async updateCartItem(req:RequestModel, res:Response) {
        
    }
}