import instance from "@/config/instance";
import axios from "axios";

export const pagingOrder = async (listId: any) => {
	const data = await instance.get(`/order/pagingCartOrder`, listId);
	return data;
};
