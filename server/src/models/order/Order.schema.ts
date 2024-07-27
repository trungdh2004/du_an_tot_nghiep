import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

// 1 : Đã đặt đơn
// 2 : Đã xác nhân đơn hàng
// 3 : Đang giao hàng
// 4 ship đã giao hàng
// 5 Đã nhận hàng
// 6 :Hủy đơn hàng

const OrderSchema = new mongoose.Schema(
  {
    user: {
      // người đặt hàng
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    address: {
      // địa chỉ
      type: mongoose.Types.ObjectId,
      ref: "Address",
      required: true,
      unique: true,
    },
    status: {
      // trạng thái đơn hàng
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
      default: 1,
    },
    voucher: {
      // voucher sử dụng
      type: mongoose.Types.ObjectId,
      ref: "Voucher",
      default: null,
    },
    totalMoney: {
      // tổng số tiền đơn hàng
      type: Number,
      default: 0,
      required: true,
    },
    amountToPay: {
      // tổng số tiền người dùng phải thanh toán
      type: Number,
      default: 0,
      required: true,
    },
    orderDate: {
      // thời gian đơn hàng đặt
      type: Date,
      default: Date.now,
    },
    confirmedDate: {
      // thời gian xác nhận đơn hàng
      type: Date,
      default: null,
    },
    shippingDate: {
      // thời gian shipper bdau giao
      type: Date,
      default: null,
    },
    shippedDate: {
      // thời gian shipper đã giao
      type: Date,
      default: null,
    },
    deliveredDate: {
      // thời gian xác nhận đã nhận
      type: Date,
      default: null,
    },
    cancelOrderDate: {
      // thời gian đơn hàng hủy
      type: Date,
      default: null,
    },
    cancelBy: {
      // 1 là người dùng hủy 2 là nhân viên hủy
      type: Number,
      enum: [1, 2],
      default: null,
    },
    shippingCost: {
      // tiền ship
      type: Number,
      default: 0,
      required: true,
    },
    estimatedDeliveryDate: {
      // thời gian ước tính nhân
      type: Date,
      required: true,
    },
    paymentMethod: {
      // phương thức thanh toán
      type: Number,
      enum: [1, 2],
      default: 1,
      required: true,
    },
    paymentStatus: {
      // trạng thái đã thanh toán
      type: Boolean,
      default: false,
      required: true,
    },
    note: {
      // lời dặn của người dùng
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
