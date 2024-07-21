import mongoose from "mongoose";
import { IProduct } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
    },
  ],
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  category: {
    ref: "Category",
    type: mongoose.Types.ObjectId,
    required: true,
  },
  quantitySold: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  isSpecial: {
    type: Boolean,
    default: false,
  },
  attributes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Attribute",
    },
  ],
}, {
  timestamps:true
});

ProductSchema.pre<IProduct>("save", async function (next) {
  const slug = generateSlugs(this.name);
  this.slug = slug;
  next();
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
