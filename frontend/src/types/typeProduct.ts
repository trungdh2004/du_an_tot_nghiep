export interface IColor {
	name: string;
	code: string;
	_id: string;
}

export interface IAttribute {
	color: string;
	size: string;
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
	category: string;
	description: string;
	_id?: string;
	featured: boolean;
	attributes: IAttribute[];
}
