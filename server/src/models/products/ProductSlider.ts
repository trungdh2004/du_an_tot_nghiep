import mongoose from "mongoose";
import { IColor, IProductSlider } from "../../interface/product";
import { required } from "joi";
import { generateSlugs } from "../../middlewares/generateSlug";

const ProductSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default:0
    },
    colorCode: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:""
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


const ProductSliderModel = mongoose.model<IProductSlider>("ProductSlider", ProductSliderSchema);

export default ProductSliderModel;
