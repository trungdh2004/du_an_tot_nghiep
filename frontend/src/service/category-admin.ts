import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";

export const paddingCate = async (SearchObjectType: SearchObjectType) => {
	const data = await instance.post(`/category/paddingCate`, SearchObjectType);
	return data;
};
