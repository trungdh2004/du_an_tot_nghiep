import { ICategory } from "./category";
import { IProduct } from "./typeProduct";
import { IColor, ISize } from "./variants";

export interface IAttribute {
	color?: IColor;
	size?: ISize;
	createdAt?: string;
	discount?: number;
	price?: number;
	quantity?: number;
	updatedAt?: string;
	_id?: string;
}
export interface IProductDetail {
	_id?: string;
	name?: string;
	price?: number;
	discount?: number;
	description?: string;
	thumbnail?: string;
	images?: [
		{
			url: string;
			_id: string;
		},
	];
	is_deleted?: boolean;
	category?: {
		_id: string;
		name: string;
		description: string;
	};
	quantitySold: number;
	quantity: number;
	isSpecial: boolean;
	attributes?: [IAttribute];
	createdAt?: string;
	updatedAt?: string;
	slug?: string;
	listColor?: [
		{
			colorId: string;
			colorName: string;
			list: [IAttribute];
			quantity: number;
		},
	];
	listSize?: [
		{
			sizeId: string;
			sizeName: string;
			list: [IAttribute];
			quantity: number;
		},
	];
}

export interface IProductSlider {
	colorCode?: string;
	createdAt?: string;
	index?: number;
	label?: string;
	product?: IProduct;
	thumbnail?: string;
	title?: string;
	updatedAt?: string;
	__v?: number;
	_id?: string;
}

export interface IFilterProduct {
	category: string | null;
	min: number | null;
	max: number | null;
	color: string[];
	size: string[];
	fieldSort: string;
	sort: 1 | -1;
}
