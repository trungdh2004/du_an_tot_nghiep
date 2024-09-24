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
	attributes: IAttribute[];
	items: ICartItem[];
	product: IProduct;
	createdAt: string;
	listColor: [
		{
			colorId: string;
			colorName: string;
			list: [IAttribute];
			quantity: number;
			colorCode: string;
		},
	];
	listSize: [
		{
			sizeId: string;
			sizeName: string;
			list: [IAttribute];
			quantity: number;
		},
	];
}
