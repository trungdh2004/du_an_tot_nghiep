import mongoose from "mongoose";
import { IColor, IProductSlider } from "../../interface/product";
import { required } from "joi";
import { generateSlugs } from "../../middlewares/generateSlug";

const ProductComing = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    date:{
        type:Date,
        required: true,
    },
    active:{
        type:Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);


const ProductComingModel = mongoose.model("ProductComing", ProductComing);

export default ProductComingModel;
