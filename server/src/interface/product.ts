export interface ICategory {
  name: string;
  code: string;
  slug: string;
}
export interface IColor {
  name: string;
  code: string;
  slug: string;
}
export interface ISize {
  name: string;
  toHeight: number;
  fromHeight: number;
  toWeight: number;
  fromWeight: number;
  slug: string;
}

export interface IProduct {
  name: string;
  price: number;
  discount: number;
  description: string;
  thumbnail: string;
  images: { url: string }[];
  slug: string;
  is_deleted: boolean;
  category: string;
  quantitySold: number;
  quantity: number;
  attributes: string[];
}

export interface IAttribute {
  products: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  discount: number;
}
