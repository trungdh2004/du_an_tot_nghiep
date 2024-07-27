import instance from "@/config/instance";
import { IProduct } from "@/types/typeProduct";

const url = "product";

export const addProduct = (value: IProduct) =>
	instance.post(`${url}/create`, value);

export const getProductById = (id: string) =>
	instance.get(`${url}/findById/${id}`);

export const updateProductById = (id: string, value: IProduct) => instance.put(`${url}/updateById/${id}`,value);
