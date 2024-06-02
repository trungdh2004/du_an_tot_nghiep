import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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
    required: true,
    unique: true,
    index: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});
