import { Response, ErrorRequestHandler } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import CartModel from "../../models/cart/Cart.schema";
import { cartItemValidation } from "../../validation/cart.validation";
import CartItemModel from "../../models/cart/CartItem.schema";
import { formatDataPaging } from "../../common/pagingData";
import ProductModel from "../../models/products/Product.schema";
import mongoose from "mongoose";
import { IAttribute, IColor, ISize } from "../../interface/product";


interface RowIColor {
  colorId: string;
  colorName: string;
  list: IAttribute[];
  quantity: number;
}
interface RowISize {
  sizeId: string;
  sizeName: string;
  list: IAttribute[];
  quantity: number;
}
class CartController {
  async pagingCart(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { pageSize = 10 } = req.body;
      let skip = 0;

      let existingCart = await CartModel.findOne({
        user: user?.id,
      });

      if (!existingCart) {
        existingCart = await CartModel.create({
          user: user?.id,
        });
      }

      // const listId = ["66adf6c4aa73c85c89b14d05","66b20cd6d41de6f68cb242cf","66b20ce3d41de6f68cb242da"].map((item) =>new mongoose.Types.ObjectId(item))

      // {
      //   $match: {
      //     _id: { $in: listId } // Lọc các cartItem có trong listId
      //   }
      // },

      const listProduct = await CartItemModel.aggregate([
        {
          $lookup: {
            from: "products", // Tên bộ sưu tập products
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product", // Giải nén mảng productDetails
        },
        {
          $lookup: {
            from: "attributes", // Tên bộ sưu tập products
            localField: "product.attributes",
            foreignField: "_id",
            as: "productAttributes",
          },
        },
        {
          $unwind: {
            path:'$productAttributes',
            preserveNullAndEmptyArrays: true
          } // Chuyển đổi mảng customer thành tài liệu riêng lẻ
        },
        {
          $lookup: {
            from: "colors", // Tên bộ sưu tập products
            localField: "productAttributes.color",
            foreignField: "_id",
            as: "productAttributes.color",
          },
        },
        {
          $unwind: '$productAttributes.color'
        },
        {
          $lookup: {
            from: "sizes", // Tên bộ sưu tập products
            localField: "productAttributes.size",
            foreignField: "_id",
            as: "productAttributes.size",
          },
        },
        {
          $unwind: '$productAttributes.size'
        },
        {
          $lookup: {
            from: "attributes", // Tên bộ sưu tập products
            localField: "attribute",
            foreignField: "_id",
            as: "attribute",
          },
        },
        {
          $unwind: "$attribute", // Giải nén mảng productDetails
        },
        {
          $lookup: {
            from: "colors", // Tên bộ sưu tập products
            localField: "attribute.color",
            foreignField: "_id",
            as: "attribute.color",
          },
        },
        {
          $unwind: "$attribute.color", // Giải nén mảng productDetails
        },
        {
          $lookup: {
            from: "sizes", // Tên bộ sưu tập products
            localField: "attribute.size",
            foreignField: "_id",
            as: "attribute.size",
          },
        },
        {
          $unwind: "$attribute.size", // Giải nén mảng productDetails
        },
        {
          $group: {
            _id: "$product",
            createdAt: { $max: "$createdAt" },
            items: {
              $addToSet: {
                quantity: "$quantity",
                createdAt: "$createdAt",
                _id: "$_id",
                price: "$product.price",
                name: "$product.name",
                productId: "$product._id",
                quantitySold: "$product.quantitySold",
                discount: "$product.discount",
                thumbnail: "$product.thumbnail",
                attribute: "$attribute",
              },
            },
            attributes : {
              $addToSet: {
                _id:"$productAttributes._id",
                color:"$productAttributes.color",
                size:"$productAttributes.size",
                quantity:"$productAttributes.quantity",
                discount:"$productAttributes.discount",
                price:"$productAttributes.price",
              }
            }
          },
        },
        {
          $sort: {
            createdAt: -1, // Sắp xếp nhóm theo ID
          },
        },
        {
          $project: {
            _id: 0,
            product: "$_id",
            createdAt: 1,
            items: 1,
            attributes:1
          },
        },
        {
          $skip: skip, // Bỏ qua các bản ghi đã được xử lý
        },
        {
          $limit: pageSize, // Giới hạn số lượng bản ghi
        },
      ]);

      const dataList = listProduct?.map((cartItem) => {
        const listColor = (cartItem?.attributes as IAttribute[])?.reduce(
          (acc: RowIColor[], item) => {
            let group = acc.find(
              (g) => g.colorId === (item.color as IColor)?._id
            );
  
            // Nếu nhóm không tồn tại, tạo nhóm mới
            if (!group) {
              group = {
                colorId: (item.color as IColor)._id as string,
                colorName: (item.color as IColor).name as string,
                list: [item],
                quantity: item.quantity,
              };
              acc.push(group);
              return acc;
            }
  
            // Thêm đối tượng vào nhóm tương ứng
            group.list.push(item);
            group.quantity = group.quantity + item.quantity;
            return acc;
          },
          []
        );
  
        const listSize = (cartItem?.attributes as IAttribute[])?.reduce(
          (acc: RowISize[], item) => {
            let group = acc.find(
              (g) => g.sizeId === (item.size as ISize)?._id
            );
            // Nếu nhóm không tồn tại, tạo nhóm mới
            if (!group) {
              group = {
                sizeId: (item.size as ISize)._id as string,
                sizeName: (item.size as ISize).name as string,
                list: [item],
                quantity: item.quantity,
              };
              acc.push(group);
              return acc;
            }
  
            // Thêm đối tượng vào nhóm tương ứng
            group.list.push(item);
            group.quantity = group.quantity + item.quantity;
            return acc;
          },
          []
        );

        return {
          ...cartItem,
          listColor,
          listSize
        }
      })

      

      const countProduct = await CartItemModel.countDocuments({
        cart: existingCart._id,
      });
      const data = formatDataPaging({
        limit: 10,
        pageIndex: 1,
        data: dataList,
        count: countProduct,
      });

      return res.status(STATUS.OK).json({
        message: "Lấy thành công ",
        data: data,
      });
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
        cart: existingCart._id,
      });

      if (existingProductCart) {
        const data = await CartItemModel.findOneAndUpdate(
          {
            product: productId,
            attribute: attribute,
          },
          {
            quantity: existingProductCart.quantity + quantity,
          },
          {
            new: true,
            populate: ["product", "attribute"],
          }
        );
        return res.status(STATUS.OK).json({
          message: "Thêm thành công",
          type: "update",
          data,
        });
      }

      const existingProduct = await ProductModel.findById(productId);

      if (!existingProduct) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm thỏa mãn",
          toast: true,
        });
      }
      if (existingProduct.is_deleted) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Sản phẩm đã bị xóa",
          toast: true,
        });
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
          type: "add",
        });
      }

      const data = await CartItemModel.findById(newCartItem._id).populate([
        "product",
        "attribute",
      ]);

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
      const updatedProduct = await CartItemModel.findByIdAndUpdate(
        id,
        {
          quantity: quantity ? quantity : existingCartItem.quantity,
          attribute: attribute ? attribute : existingCartItem.attribute,
        },
        { new: true, populate: ["product", "attribute"] }
      );

      if (!updatedProduct) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Thay đổi thất bại",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Thay đổi thành công",
        data: updatedProduct,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async deleteCartItem(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn giá trị",
        });
      }

      const existingCartItem = await CartItemModel.findById(id);

      if (!existingCartItem) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có giá trị thỏa mãn",
        });
      }

      await CartItemModel.findByIdAndDelete(id);

      return res.status(STATUS.OK).json({
        message: "Xóa thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new CartController();
