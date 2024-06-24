import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

const SizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SizeSchema.pre<ISize>("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});

const SizeModel = mongoose.model("Size", SizeSchema);

export default SizeModel;
