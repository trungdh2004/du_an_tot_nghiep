import mongoose from "mongoose";
import { ICategoryActive, IColor } from "../../interface/product";
import { required } from "joi";
import { generateSlugs } from "../../middlewares/generateSlug";

const CategoryActiveSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      default:0
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


const CategoryActiveModel = mongoose.model<ICategoryActive>("CategoryActive", CategoryActiveSchema);

export default CategoryActiveModel;
