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
    createdAt:string;
    updatedAt:string;
};


export interface IOrderItem extends Document {
    order:string | IOrder;
    product:string | IProduct;
    status:number;
    attribute:string | IAttribute
    quantity:number;
    createdAt:string;
    updatedAt:string;
}