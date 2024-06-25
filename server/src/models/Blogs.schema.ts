
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
    },
    thumbnail_url: {
      type: String,
      default:null
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    content: {
      type: String,
    },
    views_count: {
      type: Number,
      required: true,
      default: 0,
    },
    published_at: {
      type: Date,
      default:null
    },
    deleted_at: {
      type: Date!,
      default:null
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

