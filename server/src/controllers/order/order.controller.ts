import { Response } from "express";
import { RequestModel } from "../../interface/models";
import STATUS from "../../utils/status";
import OrderModel from "../../models/order/Order.schema";
import CartItemModel from "../../models/cart/CartItem.schema";
import { formatDataPaging } from "../../common/pagingData";
import mongoose from "mongoose";
import AddressModel from "../../models/Address.schema";
import { IProductCart } from "../../interface/cart";
import { IAttribute, IColor, IProduct, ISize } from "../../interface/product";
import OrderItemsModel from "../../models/order/OrderProduct.schema";
import { truncateSentence } from "../../utils/cutText";
import vnpay from "../payment/vnpay.payment";
import { ProductCode, VnpLocale } from "vnpay";
import { generateOrderCode } from "../../middlewares/generateSlug";
import PaymentModel from "../../models/order/Payment.schema";
import {
  chargeShippingFee,
  handleFutureDateTimeOrder,
} from "../../common/func";
import AttributeModel from "../../models/products/Attribute.schema";
import { IOrder, IOrderItem } from "../../interface/order";
import ShipperModel from "../../models/shipper/Shipper.schema";

const long = +process.env.LONGSHOP! || 105.62573250208116;
const lat = +process.env.LATSHOP! || 21.045193948892585;

const generateCode = async (code: string): Promise<string> => {
  const existingCode = await OrderModel.findOne({
    code: code,
  });
  if (existingCode) {
    let codeNew = generateOrderCode();
    return generateCode(codeNew as string);
  }
  return code;
};

interface IProductSelectOrder {
  _id: string;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
  slug: string;
}

interface IAccOrderClient {
  productId: string;
  product: IProductSelectOrder;
  items: IOrderItem[];
  totalMoney: number;
  is_evaluate: boolean;
}

interface IReturnVnPay {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

class OrderController {
  async createOrderPayUponReceipt(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { listId, addressId, voucher, paymentMethod, note, shippingCost } =
        req.body;

      if (paymentMethod !== 1) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Phương thức thanh toán lỗi",
        });
      }

      if (!listId || listId.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });
      }

      if (!addressId) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn địa chỉ",
        });
      }

      let address = await AddressModel.findById(addressId);

      if (!address) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có địa chỉ",
        });
      }

      const addressDetail = await AddressModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [long, lat],
            },
            distanceField: "dist",
            spherical: true,
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(address._id),
          },
        },
        {
          $limit: 1,
        },
      ]);

      if (!addressDetail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có địa chỉ",
        });
      }

      const listCartItem = await CartItemModel.find<IProductCart>({
        _id: {
          $in: listId,
        },
      }).populate([
        {
          path: "attribute",
          populate: [
            {
              path: "color",
              model: "Color",
            },
            {
              path: "size",
              model: "Size",
            },
          ],
        },
      ]);

      if (!listCartItem || listCartItem.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm nào",
        });
      }
      const listDateNew = listCartItem.map((item) => {
        return {
          product: item.product,
          status: 1,
          color: {
            name: ((item.attribute as IAttribute).color as IColor)?.name,
            code: ((item.attribute as IAttribute).color as IColor)?.code,
          },
          size: ((item.attribute as IAttribute).size as ISize)?.name,
          price: (item.attribute as IAttribute).discount,
          quantity: item.quantity,
          totalMoney: +item.quantity * +(item.attribute as IAttribute).discount,
          attribute: item.attribute,
        };
      });

      const listOrderItem = await OrderItemsModel.create(listDateNew);

      const listIdOrderItem =
        listOrderItem?.length > 0 ? listOrderItem?.map((item) => item._id) : [];

      const totalMoney = listCartItem.reduce(
        (acc: number, item: IProductCart) => {
          const totalMoney =
            +item.quantity * +(item.attribute as IAttribute).discount;
          return acc + +totalMoney;
        },
        0
      );

      const today = new Date();

      // Tạo một ngày mới sau 2 ngày
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 2);

      let code = generateOrderCode();
      code = await generateCode(code);

      const newOrder = await OrderModel.create({
        user: user?.id,
        address: addressId,
        totalMoney: shippingCost ? totalMoney + shippingCost : totalMoney,
        amountToPay: shippingCost ? totalMoney + shippingCost : totalMoney,
        distance: addressDetail[0].dist,
        shippingCost: shippingCost || 0,
        paymentMethod,
        note,
        code,
        orderItems: listIdOrderItem,
        status: 1,
        statusList: [0, 1],
      });

      if (!newOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Tạo đơn hàng thất bại",
        });
      }
      await CartItemModel.deleteMany({
        _id: {
          $in: listId,
        },
      });

      return res.status(STATUS.OK).json({
        message: "Tạo đơn hàng thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async pagingCartOrder(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { listId, addressId } = req.body;

      if (!user)
        return res.status(STATUS.AUTHORIZED).json({
          message: "Bạn chưa đăng nhập",
        });
      if (!listId?.length) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa truyền danh sách sản phẩm chọn",
        });
      }

      let addressMain = null;

      const existingAddressMain = await AddressModel.findOne({
        is_main: true,
        user: user?.id,
      });

      if (addressId) {
        const existingAddressId = await AddressModel.findById(addressId);
        if (existingAddressId) {
          addressMain = await AddressModel.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [long, lat],
                },
                distanceField: "dist",
                spherical: true,
              },
            },
            {
              $match: {
                _id: new mongoose.Types.ObjectId(existingAddressId._id),
              },
            },
            {
              $limit: 1,
            },
          ]);
        } else {
          if (existingAddressMain) {
            addressMain = await AddressModel.aggregate([
              {
                $geoNear: {
                  near: {
                    type: "Point",
                    coordinates: [long, lat],
                  },
                  distanceField: "dist",
                  spherical: true,
                },
              },
              {
                $match: {
                  _id: new mongoose.Types.ObjectId(existingAddressMain._id),
                },
              },
              {
                $limit: 1,
              },
            ]);
          }
        }
      } else {
        if (existingAddressMain) {
          addressMain = await AddressModel.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [long, lat],
                },
                distanceField: "dist",
                spherical: true,
              },
            },
            {
              $match: {
                _id: new mongoose.Types.ObjectId(existingAddressMain._id),
              },
            },
            {
              $limit: 1,
            },
          ]);
        }
      }

      const shippingCost = addressMain
        ? chargeShippingFee(addressMain[0]?.dist)
        : 0;

      const listIdObject = listId.map(
        (item: string) => new mongoose.Types.ObjectId(item)
      );

      const listProduct = await CartItemModel.aggregate([
        {
          $match: {
            _id: { $in: listIdObject },
          },
        },
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
            totalAmount: {
              $sum: { $multiply: ["$quantity", "$attribute.discount"] },
            },
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
            totalAmount: 1,
          },
        },
      ]);

      return res.status(STATUS.OK).json({
        message: "Lấy thành công ",
        data: listProduct,
        address: addressMain ? addressMain[0] : null,
        shippingCost,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async createStateUrlCart(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const { listId, voucher } = req.body;

      if (!listId || listId.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm đặt mua",
        });
      }

      const listCartItem = await CartItemModel.find<IProductCart>({
        _id: {
          $in: listId,
        },
      }).populate([
        {
          path: "attribute",
        },
        {
          path: "product",
        },
      ]);

      const checkAttribute = listCartItem.find((item) => !item.attribute);

      if (checkAttribute) {
        const stringName = truncateSentence(
          (checkAttribute.product as IProduct).name,
          30
        );
        return res.status(STATUS.BAD_REQUEST).json({
          message: `Sản phẩm '${stringName}' đã xóa loại sản phẩm bạn chọn`,
        });
      }

      const checkQuantity = listCartItem.find((item) => {
        const quantity = item.quantity;
        const quantityAttribute = (item.attribute as IAttribute).quantity;

        if (quantity > quantityAttribute) {
          return true;
        }
        return false;
      });

      if (checkQuantity) {
        const stringName = truncateSentence(
          (checkQuantity.product as IProduct).name,
          30
        );
        return res.status(STATUS.BAD_REQUEST).json({
          message: `Sản phẩm '${stringName}' đã vượt quá số lượng`,
        });
      }

      const stateValue = {
        listId,
        voucher: null,
      };

      const stateJson = JSON.stringify(stateValue);

      const stateDeCodeUrl = encodeURIComponent(stateJson);

      return res.status(STATUS.OK).json({
        url: stateDeCodeUrl,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async createOrderVNPayPayment(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const {
        listId,
        addressId,
        voucher,
        paymentMethod,
        note,
        shippingCost,
        returnUrl,
      } = req.body;

      if (paymentMethod !== 2) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Phương thức thanh toán lỗi",
        });
      }

      if (!listId || listId.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn sản phẩm",
        });
      }
      if (!addressId) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn địa chỉ",
        });
      }

      let address = await AddressModel.findById(addressId);

      if (!address) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có địa chỉ",
        });
      }

      const addressDetail = await AddressModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [long, lat],
            },
            distanceField: "dist",
            spherical: true,
          },
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(address._id),
          },
        },
        {
          $limit: 1,
        },
      ]);

      if (!addressDetail) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có địa chỉ",
        });
      }

      const listCartItem = await CartItemModel.find<IProductCart>({
        _id: {
          $in: listId,
        },
      }).populate([
        {
          path: "attribute",
          populate: [
            {
              path: "color",
              model: "Color",
            },
            {
              path: "size",
              model: "Size",
            },
          ],
        },
      ]);

      if (!listCartItem || listCartItem.length === 0) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có sản phẩm nào",
        });
      }

      const listDateNew = listCartItem.map((item) => {
        return {
          product: item.product,
          status: 0,
          color: {
            name: ((item.attribute as IAttribute).color as IColor)?.name,
            code: ((item.attribute as IAttribute).color as IColor)?.code,
          },
          size: ((item.attribute as IAttribute).size as ISize)?.name,
          price: (item.attribute as IAttribute).discount,
          quantity: item.quantity,
          totalMoney: +item.quantity * (item.attribute as IAttribute).discount,
        };
      });

      const listOrderItem = await OrderItemsModel.create(listDateNew);

      const listIdOrderItem =
        listOrderItem?.length > 0 ? listOrderItem?.map((item) => item._id) : [];

      const totalMoney = listCartItem.reduce(
        (acc: number, item: IProductCart) => {
          const totalMoney =
            +item.quantity * +(item.attribute as IAttribute).discount;
          return acc + +totalMoney;
        },
        0
      );

      const today = new Date();

      // Tạo một ngày mới sau 2 ngày
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 2);
      const futureDateTime = futureDate.toISOString();

      let code = generateOrderCode();
      code = await generateCode(code);

      const newOrder = await OrderModel.create({
        user: user?.id,
        address: address,
        totalMoney: shippingCost ? totalMoney + shippingCost : totalMoney,
        amountToPay: shippingCost ? totalMoney + shippingCost : totalMoney,
        distance: addressDetail[0].dist,
        shippingCost: shippingCost || 0,
        estimatedDeliveryDate: futureDateTime,
        paymentMethod,
        note,
        code,
        orderItems: listIdOrderItem,
      });

      if (!newOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Tạo đơn hàng thất bại",
        });
      }

      const ipAddress = String(
        req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.ip
      );

      const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: newOrder?.totalMoney,
        vnp_IpAddr: ipAddress,
        vnp_TxnRef: `${newOrder._id}`,
        vnp_OrderInfo: "Thanh toan cho ma GD:" + newOrder._id,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
        vnp_Locale: VnpLocale.VN,
      });

      return res.status(STATUS.OK).json({ paymentUrl });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  async returnOrderVnPay(req: RequestModel, res: Response) {
    try {
      const user = req.user;
      const {
        state,
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode = "02",
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash,
      } = req.query;

      if (
        !vnp_Amount ||
        !vnp_BankCode ||
        !vnp_CardType ||
        !vnp_OrderInfo ||
        !vnp_TmnCode ||
        !vnp_TransactionNo ||
        !vnp_TransactionStatus ||
        !vnp_TxnRef ||
        !vnp_SecureHash
      ) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Giao dịch bất ổn xin mời về trang chủ",
          url: "/",
          type: 1,
        });
      }

      const queryReturn: IReturnVnPay = {
        vnp_Amount: vnp_Amount as string,
        vnp_BankCode: vnp_BankCode as string,
        vnp_BankTranNo: vnp_BankTranNo as string,
        vnp_CardType: vnp_CardType as string,
        vnp_OrderInfo: vnp_OrderInfo as string,
        vnp_PayDate: vnp_PayDate as string,
        vnp_ResponseCode: vnp_ResponseCode as string,
        vnp_TmnCode: vnp_TmnCode as string,
        vnp_TransactionNo: vnp_TransactionNo as string,
        vnp_TransactionStatus: vnp_TransactionStatus as string,
        vnp_TxnRef: vnp_TxnRef as string,
        vnp_SecureHash: vnp_SecureHash as string,
      };
      let verify = vnpay.verifyReturnUrl(queryReturn);

      if (!verify.isVerified) {
        const existingOrder = await OrderModel.findById(vnp_TxnRef);
        if (existingOrder) {
          await OrderModel.findByIdAndDelete(existingOrder._id);

          await OrderItemsModel.deleteMany({
            order: existingOrder._id,
          });

          if (state) {
            return res.status(STATUS.BAD_REQUEST).json({
              message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
              type: 2,
              url: `?state=${encodeURIComponent(state as string)}`,
            });
          } else {
            return res.status(STATUS.BAD_REQUEST).json({
              message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
              url: "/",
              type: 1,
            });
          }
        }

        if (state) {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
            type: 2,
            url: `?state=${encodeURIComponent(state as string)}`,
          });
        } else {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Quá trình giao dịch đã bị chỉnh sửa đơn hàng sẽ bị hủy",
            url: "/",
            type: 1,
          });
        }
      }
      if (!verify.isSuccess) {
        const existingOrder = await OrderModel.findById(vnp_TxnRef);
        if (!existingOrder) {
          if (state) {
            return res.status(STATUS.BAD_REQUEST).json({
              message: "Không tìm thấy giá trị đơn hàng",
              type: 2,
              url: `?state=${encodeURIComponent(state as string)}`,
            });
          } else {
            return res.status(STATUS.BAD_REQUEST).json({
              message: "Không tìm thấy giá trị đơn hàng",
              url: "/",
              type: 1,
            });
          }
        }

        await OrderModel.findByIdAndDelete(existingOrder._id);

        await OrderItemsModel.deleteMany({
          _id: {
            $in: existingOrder.orderItems,
          },
        });

        if (state) {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Giao dịch đã hủy",
            type: 2,
            url: `?state=${encodeURIComponent(state as string)}`,
          });
        } else {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Giao dịch đã hủy",
            url: "/",
            type: 1,
          });
        }
      }

      const existingOrder = await OrderModel.findById(vnp_TxnRef);

      if (!existingOrder) {
        if (state) {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Không tìm thấy giá trị đơn hàng",
            type: 2,
            url: `?state=${encodeURIComponent(state as string)}`,
          });
        } else {
          return res.status(STATUS.BAD_REQUEST).json({
            message: "Không tìm thấy giá trị đơn hàng",
            url: "/",
            type: 1,
          });
        }
      }

      const payment = await PaymentModel.create({
        user: user?.id,
        method: 1,
        codeOrder: existingOrder.code,
        transactionId: verify.vnp_TransactionNo,
        amount: verify.vnp_Amount,
        paymentDate: verify.vnp_PayDate,
        cardType: verify.vnp_CardType,
        bankCode: verify.vnp_BankCode,
      });

      await OrderModel.findByIdAndUpdate(existingOrder._id, {
        payment: payment._id,
        status: 1,
        $push: {
          statusList: 1,
        },
        amountToPay: 0,
        paymentStatus: true,
      });

      await OrderItemsModel.updateMany(
        {
          order: existingOrder._id,
        },
        {
          status: 1,
        }
      );

      if (state) {
        const data = JSON.parse(state as string);

        await CartItemModel.deleteMany({
          _id: {
            $in: data.listId,
          },
        });
      }

      return res.status(STATUS.OK).json({
        message: "Đơn hàng giao dịch thành công",
        type: 3,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // server khi nhận đơn hàng
  async pagingOrderAdmin(req: RequestModel, res: Response) {
    try {
      const {
        status = 1,
        pageIndex,
        pageSize,
        sort = -1,
        startDate,
        endDate,
        method,
        is_shipper,
        paymentStatus,
      } = req.body;
      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;

      let queryDate = {};
      let queryMethod = {};
      let queryPaymentStatus = {};
      let shipperQuery = {};

      if (startDate || endDate) {
        let dateStartString = null;
        let dateEndString = null;
        if (startDate && endDate) {
          dateStartString = new Date(startDate);
          dateEndString = new Date(endDate);
          const startOfDay = new Date(
            dateStartString.getUTCFullYear(),
            dateStartString.getUTCMonth(),
            dateStartString.getUTCDate(),
            0,
            0,
            0
          );
          const endOfDay = new Date(
            dateEndString.getUTCFullYear(),
            dateEndString.getUTCMonth(),
            dateEndString.getUTCDate(),
            23,
            59,
            59
          );
          queryDate = {
            orderDate: {
              $gte: startOfDay, // Lớn hơn hoặc bằng thời gian bắt đầu của ngày đó
              $lt: endOfDay,
            },
          };
        } else if (startDate) {
          dateStartString = new Date(startDate);
          const startOfDay = new Date(
            dateStartString.getUTCFullYear(),
            dateStartString.getUTCMonth(),
            dateStartString.getUTCDate(),
            0,
            0,
            0
          );
          console.log("startOfDay", startOfDay);
          queryDate = {
            orderDate: {
              $gte: startOfDay, // Lớn hơn hoặc bằng thời gian bắt đầu của ngày đó
            },
          };
        } else if (endDate) {
          dateEndString = new Date(endDate);
          const endOfDay = new Date(
            dateEndString.getUTCFullYear(),
            dateEndString.getUTCMonth(),
            dateEndString.getUTCDate(),
            23,
            59,
            59
          );
          queryDate = {
            orderDate: {
              $lt: endOfDay,
            },
          };
        }
      }

      if (method) {
        switch (method) {
          case 1:
            queryMethod = {
              paymentMethod: 1,
            };
            break;
          case 2:
            queryMethod = {
              paymentMethod: 2,
            };
            break;
          case 3:
            queryMethod = {
              paymentMethod: 3,
            };
            break;
          default:
            queryMethod = {};
        }
      }

      if (paymentStatus) {
        queryPaymentStatus = {
          paymentStatus: !!paymentStatus,
        };
      }

      if (is_shipper) {
        shipperQuery = {
          shipper: { $ne: null },
        };
      } else {
        shipperQuery = {
          shipper: null,
        };
      }

      const listOrder = await OrderModel.find({
        status: status,
        ...queryDate,
        ...queryMethod,
        ...queryPaymentStatus,
        ...shipperQuery,
      })
        .populate(["address", "user", "payment", "shipper"])
        .sort({
          orderDate: sort,
        })
        .skip(skip)
        .limit(limit);

      const countOrder = await OrderModel.countDocuments({
        status: status,
        ...queryDate,
        ...queryMethod,
        ...queryPaymentStatus,
        ...shipperQuery,
      });

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: listOrder,
        count: countOrder,
      });

      return res.status(STATUS.OK).json({
        message: "Lấy danh sách thành công",
        data: data,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // chi tiết order

  async getByIdOrderAdmin(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn đơn hàng",
        });

      const existingOrder = await OrderModel.findById(id).populate([
        "user",
        "address",
        "shipper",
        {
          path: "orderItems",
          populate: {
            path: "product",
          },
        },
      ]);

      if (!existingOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có đơn hàng nào",
        });
      }

      return res.status(STATUS.OK).json({
        message: "Lấy giá trị thành công",
        data: existingOrder,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // đồng ý đơn hàng
  async confirmOrderAdmin(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;

      if (!id)
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn đơn hàng",
        });

      const existingOrder = await OrderModel.findById(id).populate({
        path: "orderItems",
        populate: {
          path: "attribute",
        },
      });

      if (!existingOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có đơn hàng nào",
        });
      }

      const checkQuantity = existingOrder.orderItems.find((item) => {
        const attribute = (item as IOrderItem).attribute as IAttribute;
        if ((item as IOrderItem).quantity > attribute.quantity) {
          return true;
        }
        return false;
      });

      if (checkQuantity) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Có sản phẩm vượt qua số lượng sản phẩm còn lại",
        });
      }

      existingOrder.orderItems.map(async (item, index) => {
        const id = (item as IOrderItem).attribute;
        const quantity = (item as IOrderItem).quantity;
        await AttributeModel.findByIdAndUpdate(id, {
          $inc: { quantity: -quantity },
        });
      });

      let futureDateTimeOrder = handleFutureDateTimeOrder(1000);

      if (existingOrder.distance) {
        futureDateTimeOrder = handleFutureDateTimeOrder(existingOrder.distance);
      }

      await OrderModel.findByIdAndUpdate(existingOrder._id, {
        status: 2,
        $push: {
          statusList: 2,
        },
        confirmedDate: Date.now(),
        estimatedDeliveryDate: futureDateTimeOrder,
      });

      await OrderItemsModel.updateMany(
        {
          _id: {
            $in: existingOrder.orderItems,
          },
        },
        {
          status: 2,
        },
        {
          now: true,
        }
      );

      return res.status(STATUS.OK).json({
        message: "Cập nhập đơn hàng thành công",
        existingOrder,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // chọn shipper
  async deliveredToShipper(req: RequestModel, res: Response) {
    try {
      const { shipper } = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Chưa chọn đơn hàng",
        });
      }

      if (!shipper) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Chưa chọn shipper",
        });
      }

      const existingOrder = await OrderModel.findById(id);

      if (!existingOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có đơn hàng nào",
        });
      }

      if (existingOrder.status < 2) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Đơn hàng chưa xác nhận",
        });
      }

      const existingShipper = await ShipperModel.findById(shipper);

      if (!existingShipper) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có shipper nào",
        });
      }

      const updateOrder = await OrderModel.findByIdAndUpdate(id, {
        shipper: existingShipper._id,
      });

      return res.status(STATUS.OK).json({
        message: "Chọn shipper thành công",
        data: updateOrder,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // queryClient
  async pagingOrderClient(req: RequestModel, res: Response) {
    try {
      const { status, pageIndex, pageSize } = req.body;
      const user = req.user;
      let limit = pageSize || 10;
      let skip = (pageIndex - 1) * limit || 0;
      let queryStatus = {};

      if (!status) {
        queryStatus = {
          status: {
            $in: [1, 2, 3, 4, 5, 6],
          },
        };
      } else {
        queryStatus = {
          status: status,
        };
      }

      const listOrder = await OrderModel.find({
        user: user?.id,
        ...queryStatus,
      })
        .populate({
          path: "orderItems",
          populate: {
            path: "product",
            select: {
              _id: 1,
              price: 1,
              discount: 1,
              thumbnail: 1,
              name: 1,
              slug: 1,
            },
          },
        })
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean();

      const convestOrder =
        listOrder.length > 0
          ? listOrder?.map((order: IOrder, index) => {
              if (order.orderItems.length > 0) {
                const mapItemOrder = order.orderItems.reduce(
                  (acc: IAccOrderClient[], item) => {
                    const accCheck = acc.find(
                      (row) =>
                        row.productId.toString() ===
                        (
                          (item as IOrderItem).product as IProductSelectOrder
                        )._id.toString()
                    );
                    // console.log(`accCheck ${order?.code}`,accCheck);
                    if (accCheck) {
                      const totalMoney =
                        accCheck.totalMoney + (item as IOrderItem).totalMoney;
                      accCheck.items.push(item as IOrderItem);
                      accCheck.totalMoney = totalMoney;
                      return acc;
                    }

                    acc.push({
                      productId: (
                        (item as IOrderItem).product as IProductSelectOrder
                      )._id,
                      product: (item as IOrderItem)
                        .product as IProductSelectOrder,
                      totalMoney: (item as IOrderItem).totalMoney,
                      items: [item as IOrderItem],
                      is_evaluate: (item as IOrderItem).is_evaluate,
                    });
                    return acc;
                  },
                  []
                );
                return {
                  ...order,
                  itemList: mapItemOrder,
                };
              }

              return [];
            })
          : [];

      const countOrder = await OrderModel.countDocuments({
        user: user?.id,
        ...queryStatus,
      });

      const data = formatDataPaging({
        limit,
        pageIndex,
        data: convestOrder,
        count: countOrder,
      });

      return res.status(STATUS.OK).json({
        message: "Lấy danh sách thành công",
        data: data,
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // đã nhận hàng
  async receivedClientOrder(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn đơn hàng",
        });
      }

      const existingOrder = await OrderModel.findById(id);

      if (!existingOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có đơn hàng",
        });
      }

      if (existingOrder.status !== 4) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Đơn hàng chưa giao",
        });
      }

      const successOrder = await OrderModel.findByIdAndUpdate(
        id,
        {
          status: 5,
          $push: {
            statusList: 5,
          },
        },
        { new: true }
      );

      return res.status(STATUS.BAD_REQUEST).json({
        message: "Cập nhập thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }

  // hủy hàng
  async cancelClientOrder(req: RequestModel, res: Response) {
    try {
      const { id } = req.params;
      const user = req.user;

      if (!id) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Bạn chưa chọn đơn hàng",
        });
      }

      const existingOrder = await OrderModel.findById(id);

      if (!existingOrder) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Không có đơn hàng",
        });
      }

      if (existingOrder.status !== 1) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: "Đơn hàng không thể hủy",
        });
      }

      const successOrder = await OrderModel.findByIdAndUpdate(
        id,
        {
          status: 6,
          $push: {
            statusList: 6,
          },
        },
        { new: true }
      );

      return res.status(STATUS.BAD_REQUEST).json({
        message: "Hủy đơn hàng thành công",
      });
    } catch (error: any) {
      return res.status(STATUS.INTERNAL).json({
        message: error.message,
      });
    }
  }
}

export default new OrderController();
