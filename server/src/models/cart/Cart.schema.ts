import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
