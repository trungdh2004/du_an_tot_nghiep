import { Request, Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import OrderItemsModel from "../../models/order/OrderProduct.schema";
import { IOrderItem } from "../../interface/order";
import EvaluateModel from "../../models/products/Evaluate.schema";
import ProductModel from "../../models/products/Product.schema";
import { aw } from "@upstash/redis/zmscore-d1ec861c";
import UserModel from "../../models/User.Schema";
import { formatDataPaging } from "../../common/pagingData";

class EvaluateController {
  async createEvaluate(req: RequestModel, res: Response) {
    try {
      const user = req.user
      const { listId, rating, content } = req.body;
      console.log("req.body", req.body)

      if (!listId || !rating || listId?.length === 0 || !content) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn truyền thiếu dữ liệu",
        });
      }
      console.log("1")
      const listOrderProduct = await OrderItemsModel.find({
        _id: {
          $in: [...listId],
        },
      });
      console.log("2")
      if (listOrderProduct?.length !== listId?.length) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Danh sách sản phẩm có lỗi",
        });
      }
      console.log("3")
      const check = listOrderProduct?.some((orderItem: IOrderItem) => {
        return orderItem.status !== 5 || orderItem?.is_evaluate;
      });
      console.log("4")
      if (check) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Đã đánh giá",
        });
      }

      let product = null;

      const createEvaluate = listOrderProduct?.map((orderItem: IOrderItem) => {
        product = orderItem.product

        return {
          product: orderItem.product,
          rating: +rating,
          user: user?.id,
          content: content,
          attribute: orderItem.variant
        }
      });
      console.log("5")
      const findProduct = await ProductModel.findById(product)

      if (!findProduct) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm muốn đánh giá"
        })
      }
      console.log("6")
      const newEvaluate = await EvaluateModel.create(createEvaluate)
      console.log("ada")
      const updateOrderItem = await OrderItemsModel.updateMany({
        _id: {
          $in: [...listId]
        }
      }, {
        is_evaluate: true
      }, { new: true })
      console.log("7")
      const ratingCount = findProduct.ratingCount + rating
      const ratingQuantity = findProduct.ratingQuantity + 1
      const ratingPro = (ratingCount / ratingQuantity).toFixed(1)
      console.log("8")
      await ProductModel.findByIdAndUpdate(product, {
        ratingCount,
        ratingQuantity,
        rating: ratingPro
      })

      await UserModel.findByIdAndUpdate(user?.id, {
        $inc: { point: 200 }
      })

      return res.status(STATUS.OK).json({
        message: "Tạo đánh giá thành công"
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }


  async pagingEvaluate(req: Request, res: Response) {
    try {
      const pageIndex = Number(req.query.page) || 1;
      let limit = 10;
      let skip = (pageIndex - 1) * limit || 0;
      const { id } = req.params
      const { rating } = req.body

      if (!id) return res.status(STATUS.BAD_REQUEST).json({
        message: "Bạn chưa chọn sản phẩm"
      })
      let queryRating = {}

      if (rating && rating <= 5 && rating > 0) {
        queryRating = {
          rating: rating,
        }
      }

      console.log({ queryRating });


      const listEvaluate = await EvaluateModel.find({
        ...queryRating,
        product: id,
        isDelete: false
      }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate({
        path: "user",
        select: {
          _id: 1,
          full_name: 1,
          email: 1,
          avatarUrl: 1
        }
      })


      const countEvaluate = await EvaluateModel.countDocuments({
        ...queryRating,
        product: id,
        isDelete: false
      })


      const result = formatDataPaging({
        limit,
        pageIndex,
        data: listEvaluate,
        count: countEvaluate,
      });

      return res.status(STATUS.OK).json({
        ...result,
      });
    } catch (error) {

    }
  }
}

export default new EvaluateController();
