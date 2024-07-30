import mongoose from "mongoose";

const ShipperSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    isCompleted:{
      type:Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

const ShipperModal = mongoose.model("Shipper", ShipperSchema);

export default ShipperModal;
