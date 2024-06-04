import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
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

const BrandModel = mongoose.model("Brand", BrandSchema);

export default BrandModel;
