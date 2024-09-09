import mongoose, { Types } from "mongoose";

export interface IComment {
  _id: string;
  content: string;
  user: Types.ObjectId;
  commentType: string;
  comment_id: Types.ObjectId;
  replies: [];
  replies_count: number;
  reactions:string[],
  reactions_count:number;
  createdAt:Date,
  updatedAt:Date
}

const CommentProSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref:"User"
    },
    commentType: {
      type: String,
    },
    comment_id: {
      type: mongoose.Types.ObjectId,
    },
    replies: {
      type: Array,
      default: [],
    },
    replies_count: {
      type: Number,
      default: 0,
    },
    reactions: [{ type: mongoose.Types.ObjectId }],
    reactions_count: {
      type: Number,
      default: 0,
    },
    is_removed:{
      type:Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);
const CommentModel = mongoose.model<IComment>("Comments", CommentProSchema);
export default CommentModel;
