import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";
import { IOrderItem } from "../../interface/order";

const OrderItemsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6],
      default: 1,
    },
    color:{
      name:String,
      code:String,
    },
    size:{
      type:String,
      required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    quantity: {
      type: Number,
      default:0
    },
    totalMoney:{
      type:Number,
      default:0
    }
  },
  {
    timestamps: true,
  }
);

const OrderItemsModel = mongoose.model<IOrderItem>("OrderItems", OrderItemsSchema);

export default OrderItemsModel;
