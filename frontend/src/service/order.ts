import instance from "@/config/instance";
import { ObjectCheckoutOrder } from "@/types/ObjectCheckoutOrder";
import { SearchObjectOrder } from "@/types/searchObjectOrder";
import axios from "axios";
import { boolean, string } from "zod";

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

export const pagingOrderAdmin = async (
	SearchObjectOrder: SearchObjectOrder,
) => {
	const data = await instance.post(
		`/order/pagingOrderServer`,
		SearchObjectOrder,
	);
	return data;
};

export const getOrderById = async (id: string) => {
	const data = await instance.get(`/order/getByIdServer/${id}`);
	return data;
};

export const confirmOrder = async (id: string) => {
	const data = await instance.post(`/order/confirmOrder/${id}`);
	return data;
};
