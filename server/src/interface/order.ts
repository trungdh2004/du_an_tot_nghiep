import mongoose, { Document } from "mongoose";
import { IAddress } from "./address";
import { IUser } from "./models";
import { IAttribute, IProduct } from "./product";
import { AttributeElement, ProductFindCart } from "./cart";

export interface IOrder extends Document {
    _id:string;
    user:string | IUser
    code:string;
    address:string | IAddress;
    status:number
    statusList:number[]
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
    distance:number
    orderItems:(string|IOrderItem)[]
};


export interface IOrderItem extends Document {
    _id:string;
    product:IProduct;
    status:number;
    quantity:number;
    createdAt:string;
    updatedAt:string;
    variant:string;
    price:number
    attribute:IAttribute,
    totalMoney:number
    is_evaluate:boolean
    is_simple:boolean
}


export interface IListCart {
    productId:string;
    totalAmount:number;
    items:IListCartItem[]
}

export interface IListCartItem {
    attribute:AttributeElement,
    discount:number;
    name:string;
    price:number;
    productId:string;
    quantity:number;
    thumbnail:string;
    _id:string;
    is_simple:boolean
} 