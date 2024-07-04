import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";

export const paddingCate = async (SearchObjectType: SearchObjectType) => {
	const data = await instance.post(`/category/paddingCate`, SearchObjectType);
	return data;
};


export const hiddencate = async (id: string | boolean) => {
	const data = await instance.delete(`category/deleteCate/${id}`);
	return data;
};


export const unhiddencate = async (id: string | boolean) => {
	const data = await instance.put(`category/unDelete/${id}`);
	return data;
};
