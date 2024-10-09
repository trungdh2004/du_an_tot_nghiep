import instance from "@/config/instance";
import { SearchObjectTypeProduct } from "@/types/searchObjecTypes";
import { IProduct } from "@/types/typeProduct";

const url = "product";

export const addProduct = (value: IProduct) =>
	instance.post(`${url}/create`, value);

export const getProductById = (id: string) =>
	instance.get(`${url}/findById/${id}`);

export const updateProductById = (id: string, value: IProduct) =>
	instance.put(`${url}/updateById/${id}`, value);

export const pagingProduct = (value: SearchObjectTypeProduct) =>
	instance.post(`${url}/paging`, value);

export const deletedById = (id: string) =>
	instance.put(`${url}/deletedById/${id}`);

export const unDeletedById = (id: string) =>
	instance.put(`${url}/unDeletedById/${id}`);

export const unDeleteMany = (value: { listId: string[] }) =>
	instance.put(`${url}/unDeletedMany`, value);

export const deleteMany = (value: { listId: string[] }) =>
	instance.put(`${url}/deletedMany`, value);
export const getProductBySlug = (slug: string) =>
	instance.get(`${url}/findBySlug/${slug}`);

export const pagingProductOfVoucher = ({
	pageIndex,
	keyword,
}: {
	pageIndex: number;
	keyword: string;
}) => instance.post(`${url}/pagingProductOfVoucher`, { pageIndex, keyword });
