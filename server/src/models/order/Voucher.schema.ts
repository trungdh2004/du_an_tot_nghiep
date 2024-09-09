import mongoose from "mongoose";
import { ISize } from "../../interface/product";
import { generateSlugs } from "../../middlewares/generateSlug";
import { IVoucher } from "../../interface/voucher";
// import { IOrderItem } from "../../interface/order";

// 1 : giá tiền 
// 2 : phần trăm,


const VoucherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        // dang % hay là sô tiền
        discountType: {
            type: Number,
            enum: [1, 2],
            required: true,
        },
        discountValue: {
            type: Number,
            required: true,
        },
        usageLimit: {
            type: Number,
            required: true,
            default: 0
        },
        minimumOrderValue: {
            type: Number,
            required: true,
            default: 0
        },
        usageCount: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            enum: [1, 2],
            default: 1
        },
        version: {
            type: Number,
            default: 0,
        },
        modifiedDate: {
            type: String,
            default: null
        },
        modifiedBy: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

const VoucherModel = mongoose.model<IVoucher>("Voucher", VoucherSchema);

export default VoucherModel;
