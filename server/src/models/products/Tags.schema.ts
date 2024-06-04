import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const TagsModel = mongoose.model("Tags", TagsSchema);

export default TagsModel;
