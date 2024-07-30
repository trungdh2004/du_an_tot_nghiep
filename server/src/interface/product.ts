export interface ICategory {
  _id?: string;
  name: string;
  code: string;
  slug: string;
}
export interface IColor {
  _id?: string;
  name: string;
  code: string;
  slug: string;
}
export interface ISize {
  _id?: string;
  name: string;
  toHeight: number;
  fromHeight: number;
  toWeight: number;
  fromWeight: number;
  slug: string;
}

export interface IProduct {
  _id?: string;
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
  attributes: IAttribute[] | string[];
}

export interface IAttribute {
  _id?: string;
  products: string;
  color: string | IColor;
  size: string | ISize;
  price: number;
  quantity: number;
  discount: number;
}


export interface IProductSlider {
  _id?: string;
  label: string;
  name: string;
  index: number;
  product: string | IProduct,
  colorCode: string,
  thumbnail?: string
}

export interface ICategoryActive {
  _id?: string;
  index: number;
  category: string | ICategory,
}