import { Response, ErrorRequestHandler } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import CartModel from "../../models/cart/Cart.schema";
import { cartItemValidation } from "../../validation/cart.validation";
import CartItemModel from "../../models/cart/CartItem.schema";
import { formatDataPaging } from "../../common/pagingData";
import ProductModel from "../../models/products/Product.schema";

class CartController {
  async pagingCart(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { pageIndex = 1 } = req.body
      let skip = (pageIndex - 1) * 10 || 0;

      let existingCart = await CartModel.findOne({
        user: user?.id
      })

      if (!existingCart) {
        existingCart = await CartModel.create({
          user: user?.id
        })
      }

      const listProduct = await CartItemModel.find({
        cart: existingCart._id
      }).sort({ createdAt: -1 }).skip(skip).limit(10).populate([{
        path: "product",
        select: "_id name price discount thumbnail"
      }, "attribute"])

      const countProduct = await CartItemModel.countDocuments({
        cart: existingCart._id
      })
      const data = formatDataPaging({
        limit: 10,
        pageIndex: pageIndex,
        data: listProduct,
        count: countProduct
      })


      return res.status(STATUS.OK).json({
        message: "Lấy thành công ",
        data: data
      })
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
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

      const { productId, quantity, attribute } = req.body;

      if (!user)
        return res.status(STATUS.AUTHORIZED).json({
          message: "Bạn chưa đăng nhập",
        });

      let existingCart = await CartModel.findOne({
        user: user?.id,
      });

      if (!existingCart) {
        existingCart = await CartModel.create({
          user: user.id,
        });
      }

      const existingProductCart = await CartItemModel.findOne({
        product: productId,
        attribute: attribute,
        cart: existingCart._id
      });

      if (existingProductCart) {
        const data = await CartItemModel.findOneAndUpdate(
          {
            product: productId,
            attribute: attribute,
          },
          {
            quantity: existingProductCart.quantity + quantity,
          }, {
          new: true,
          populate: ["product", "attribute"]
        }
        );
        return res.status(STATUS.OK).json({
          message: "Thêm thành công",
          type: "update",
          data
        });
      }

      const existingProduct = await ProductModel.findById(productId)


      if (!existingProduct) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm thỏa mãn",
          toast: true
        })
      }
      if (existingProduct.is_deleted) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Sản phẩm đã bị xóa",
          toast: true
        })
      }

      const newCartItem = await CartItemModel.create({
        product: productId,
        quantity,
        attribute,
        cart: existingCart._id,
      });

      if (!newCartItem) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Thêm thất bại",
          type: "add"
        });
      }

      const data = await CartItemModel.findById(newCartItem._id).populate(["product", "attribute"])

      return res.status(STATUS.OK).json({
        message: "Thêm thành công",
        data: data,
        type: "add",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async updateCartItem(req: RequestModel, res: Response) {
    try {
      const { quantity, attribute } = req.body;
      const { id } = req.params;
      if (!quantity && !attribute) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa truyền giá trị",
        });
      }

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn",
        });

      const existingCartItem = await CartItemModel.findById(id);

      if (!existingCartItem) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị thỏa mãn",
        });
      }
      const updatedProduct = await CartItemModel.findByIdAndUpdate(id, {
        quantity: quantity ? quantity : existingCartItem.quantity,
        attribute: attribute ? attribute : existingCartItem.attribute
      }, { new: true, populate: ["product", "attribute"] })

      if (!updatedProduct) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Thay đổi thất bại",
        });
      }


      return res.status(STATUS.OK).json({
        message: "Thay đổi thành công",
        data: updatedProduct
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteCartItem(req: RequestModel, res: Response) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn giá trị"
        })
      }

      const existingCartItem = await CartItemModel.findById(id)

      if (!existingCartItem) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị thỏa mãn"
        })
      }

      await CartItemModel.findByIdAndDelete(id)

      return res.status(STATUS.OK).json({
        message: "Xóa thành công"
      })
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      })
    }
  }
}

export default new CartController();
