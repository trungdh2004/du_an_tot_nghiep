import mongoose from "mongoose";
import { ICategory } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    // products: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre<ICategory>("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
