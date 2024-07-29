import instance from "@/config/instance";
import { SearchObjectType } from "@/types/searchObjecTypes";
import { TypeObjectCategory } from "@/types/TypeObjectCategory";

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
export const getAllCategory = async () => {
	const data = await instance.get(`/category/getAllCate`);
	return data;
};

export const hiddenManyCate = async (listId: any) => {
	const data = await instance.put(`category/deleteMany`, {
		listId,
	});
	return data;
};

export const unhiddenManyCate = async (listId: any) => {
	const data = await instance.put(`category/unDeleteMany`, {
		listId,
	});
	return data;
};


export const updateCategory = async (open:string | boolean ,dataForm:TypeObjectCategory) => {
  const data = await instance.put(`/category/updateCate/${open}`, dataForm);
  return data
}

export const addCategory = async (dataForm: TypeObjectCategory) => {
	const data = await instance.post(`/category/addCate`, dataForm);
	return data;
};

export const getCategory = async (open:string | boolean) => {
  const data = instance.get(`/category/cate/${open}`);
  return data;
}