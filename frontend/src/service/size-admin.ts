import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";

export const paddingCate = async (SearchObjectType: SearchObjectType) => {
	const data = await instance.post(`/category/paddingCate`, SearchObjectType);
	return data;
};

export const hiddenSize = async (id: string | boolean) => {
	const data = await instance.delete(`size/deleteSize/${id}`);
	return data;
};

export const unhiddenSize = async (id: string | boolean) => {
	const data = await instance.put(`size/unDelete/${id}`);
	return data;
};

export const hiddenListSize = async (listId: any) => {
  const data = await instance.put(`size/deleteMany`, {
		listId,
	});
	return data;
};

export const unhiddenListSize = async (listId: any) => {
	const data = await instance.put(`size/unDeleteMany`, {
		listId,
	});
	return data;
};


export const getAllSize = async () => {
  const data = await instance.get(`size/getAll`);
  return data;
}