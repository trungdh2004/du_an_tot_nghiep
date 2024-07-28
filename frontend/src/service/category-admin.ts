import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";
import { TypeObjectCategory } from "@/types/TypeObjectCategory";
const urlConfig = "category";
export const getAllCate = async () => {
	const data = await instance.get(`${urlConfig}/getAllCate`);
	return data;
};

export const paddingCate = async (SearchObjectType: SearchObjectType) => {
	const data = await instance.post(
		`${urlConfig}/paddingCate`,
		SearchObjectType,
	);
	return data;
};

export const hiddencate = async (id: string | boolean) => {
	const data = await instance.delete(`${urlConfig}/deleteCate/${id}`);
	return data;
};

export const unhiddencate = async (id: string | boolean) => {
	const data = await instance.put(`${urlConfig}/unDelete/${id}`);
	return data;
};
