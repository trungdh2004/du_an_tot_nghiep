import mongoose from "mongoose";
import { generateSlugs } from "../middlewares/generateSlug";
import { ITags } from "../interface/blogs";

const TagsSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

TagsSchema.pre<ITags>("save", async function (next) {
  console.log("hihi chạy r nè");

  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});

const TagsModel = mongoose.model<ITags>("Tags", TagsSchema);

export default TagsModel;
