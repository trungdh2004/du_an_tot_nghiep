import { IColor } from "./typeProduct";

export interface IProductOfOrder {
  _id: string;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
  slug: string;
}
export interface IItemOrder {
  _id: string;
  attribute: string;
  color: {
    name: string;
    code: string;
  };
  createdAt: string;
  is_evaluate: boolean;
  price: number;
}
export interface IItemOrderList {
  productId: string;
  product: IProductOfOrder;
  totalMoney: number;
  items: IItemOrder;
  is_evaluate: boolean;
}
export interface IOrderList {
  _id: string;
  user: string;
  code: string;
  address: string;
  status: number;
  statusList: number[];
  voucher: string | null;
  voucherVersion: string | null;
  totalMoney: number;
  amountToPay: number;
  confirmedDate: string | null;
  shippingDate: string | null;
  shippedDate: string | null;
  deliveredDate: string | null;
  cancelBy: string | null;
  noteCancel: string | null;
  distance: number;
  shippingCost: number;
  estimatedDeliveryDate: string | null;
  paymentMethod: number;
  paymentStatus: boolean;
  payment: string | null;
  note: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  itemList: IItemOrderList;
}