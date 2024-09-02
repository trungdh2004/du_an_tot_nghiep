import instance from "@/config/instance";
import { ObjectCheckoutOrder } from "@/types/ObjectCheckoutOrder";
import axios from "axios";

export const pagingOrder = async (listId: any) => {
  const data = await instance.post(`/order/pagingCartOrder`, listId);
  return data;
};

export const createOrderPayUponReceipt = async (
  orderCheckout: ObjectCheckoutOrder,
) => {
  const data = await instance.post(
    `/order/createOrderPayUponReceipt`,
    orderCheckout,
  );
  return data;
};

export const createOrderVNPayPayment = async (
  orderCheckout: ObjectCheckoutOrder,
) => {
  const data = await instance.post(
    `/order/createOrderVNPayPayment`,
    orderCheckout,
  );
  return data;
};

export const returnUrlVnPay = async (dataUrl: any) => {
  const data = await instance.get(`/order/returnVnPay?${dataUrl}`);
  return data;
};

export const fetchOrder = async (obj: { status: null | number }) => {
  const data = await instance.post(`/order/pagingOrderClient`, obj);
  return data;
}

export const fetchOrderDetail = async (id: string) => {
  const data = await instance.get(`/order/getDetailOrder/${id}`);
  return data;
}