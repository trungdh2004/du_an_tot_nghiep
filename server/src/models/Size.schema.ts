import mongoose from "mongoose";

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

const SizeModel = mongoose.model("Size", SizeSchema);

export default SizeModel;
