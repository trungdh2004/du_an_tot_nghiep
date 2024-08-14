import { TypeObjectCategory } from "./TypeObjectCategory";
import { SizeTypes } from "./typeSize";

export interface IColor {
	name: string;
	code: string;
	_id: string;
}

export interface IAttribute {
	color: IColor | string;
	size: SizeTypes | string;
	price: number;
	quantity: number;
	discount: number;
}

export interface IItemListColor {
	color: IColor | null;
	size: IColor | null;
	price: number;
	quantity: number;
	discount: number;
}

export interface IProduct {
	name: string;
	price: number;
	discount: number;
	thumbnail: string;
	images: { url: string }[];
	category: TypeObjectCategory | string;
	description: string;
	_id?: string;
	featured?: boolean;
	attributes: IAttribute[];
	createdAt?:string;
	updatedAt?:string;
	is_deleted?: boolean;
	quantity?: number;
	quantitySold?: number;
}
