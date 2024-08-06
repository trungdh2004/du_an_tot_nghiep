import { IUser } from "./models";
import { IAttribute, IProduct } from "./product";

export interface ICart {
    user:string | IUser
}

export interface IProductCart {
    product:string | IProduct;
    quantity:number;
    cart:string | ICart;
    attribute:string | IAttribute
}