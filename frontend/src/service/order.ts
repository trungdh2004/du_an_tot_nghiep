import instance from "@/config/instance";
import axios from "axios";

export const pagingOrder = async (listId: any) => {
	const data = await instance.post(`/order/pagingCartOrder`, listId);
	return data;
};

export const createOrderPayUponReceipt = async () => {
  const data = await instance.post(`/order/createOrderPayUponReceipt`);
  return data;
};
