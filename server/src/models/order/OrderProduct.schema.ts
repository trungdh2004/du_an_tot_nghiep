import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

const CartSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    status: {
        
    }
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
