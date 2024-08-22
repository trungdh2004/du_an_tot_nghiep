import { Document } from "mongoose";
import { IAddress } from "./address";
import { IUser } from "./models";
import { IAttribute, IProduct } from "./product";

export interface IOrder extends Document {
    user:string | IUser
    code:string;
    address:string | IAddress;
    status:number
    voucher?:any;
    totalMoney:number;
    amountToPay:number;
    orderDate:string;
    confirmedDate?:string;
    shippingDate?:string;
    shippedDate?:string;
    deliveredDate?:string;
    cancelOrderDate?:string;
    cancelBy?:number;
    shippingCost:number;
    estimatedDeliveryDate:string;
    paymentMethod:number;
    paymentStatus:boolean;
    note?:string;
    shipper:string;
    createdAt:string;
    updatedAt:string;
    orderItems:string[]
};


export interface IOrderItem extends Document {
    product:string | IProduct;
    status:number;
    quantity:number;
    createdAt:string;
    updatedAt:string;
    color:{
        name:string,
        code:string
    },
    size:string,
    price:number
}