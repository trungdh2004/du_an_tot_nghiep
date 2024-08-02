import { TypeObjectCategory } from "./TypeObjectCategory";
import { SizeTypes } from "./typeSize";

export interface IColor {
	name: string;
	code: string;
	_id: string;
}

export interface IAttribute {
	color: IColor;
	size: SizeTypes;
	price: string;
	quantity: number;
	discount: number;
}

export interface IProduct {
	name: string;
	price: number;
	discount: number;
	thumbnail: string;
	images: { url: string }[];
	category: TypeObjectCategory;
	description: string;
	_id?: string;
	featured: boolean;
	attributes: IAttribute[];
	createdAt?:string;
	updatedAt?:string;
	is_deleted: boolean;
	quantity: number;
	quantitySold: number;
}
