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
