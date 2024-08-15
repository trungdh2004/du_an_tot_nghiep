import { IAttribute, IProduct } from "./typeProduct";

export interface ICartItem {
    _id?: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    attribute: IAttribute;
    quantity?: number;
    quantitySold?: number;
    attributeProduct: IAttribute[];
}
export interface ICart {
    items: ICartItem;
    product: IProduct;
}