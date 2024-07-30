import { ICategory } from "./category";
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
export interface IProduct {
	_id?: string;
	name?: string;
	price?: number;
	discount?: number;
	description?: string;
	attributes?: IAttribute[];
	category?: ICategory;
	createdAt?: string;
	updatedAt?: string;
	images?: {
		url: string;
		_id?: string;
	}[];
	listColor: {
		colorId: string;
		colorName: string;
		colorCode: string;
	}[];
	isSpecial?: boolean;
	is_deleted?: boolean;
	quantity?: number;
	quantitySold?: number;
	slug?: string;
	thumbnail?: string;
	__v?: number;
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
