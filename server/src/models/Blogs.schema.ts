import mongoose from "mongoose";
import { IBlogs } from "../interface/blogs";

const BlogShema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    content: { type: String },
    views_count: { type: Number },
    is_recommend: { type: Boolean },
    is_approved: { type: Boolean },
    published_at: { type: String },
    deleted_at: { type: String },
    comments_count: { type: Number },
    countLike: { type: Number },
    selected_tags: [{ type: String }],
    image_url: { type: String },
    thumbnail_url: { type: String },
    isNotification: { type: Boolean },
    is_delete: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model<IBlogs>("Blog", BlogShema);

export default BlogModel;
