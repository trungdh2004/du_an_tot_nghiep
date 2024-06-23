
import { required } from "joi";
import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    views_count: {
      type: Number,
      required: true,
      default: 0,
    },
    published_at: {
      type: Date,
    },
    deleted_at: {
      type: Date,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      required: true,
    },
    comments_count: {
      type: Number,
      required: true,
      default: 0,
    },
    countLike: {
      type: Number,
      required: true,
      default: 0,
    },
    selected_tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BlogsModel = mongoose.model("Blogs", BlogsSchema);

export default BlogsModel;

