import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";
import { ICart } from "../../interface/cart";

const ShipperSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName:{
        type:String,
        required: true,
    },
    birthDate:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    idCitizen:{
        type:String,
        required: true,
        maxLength:12
    },
    avatar:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    is_block:{
        type:Boolean,
        default:false,
    },
    active:{
        type:Boolean,
        default:false,
    },
    block_at:{
        type:String,
        default:null
    },
    totalIncome:{
        type:Number,
        default:0
    }
  },
  {
    timestamps: true,
  }
);

const ShipperModel = mongoose.model<ICart>("Shipper", ShipperSchema);

export default ShipperModel;
