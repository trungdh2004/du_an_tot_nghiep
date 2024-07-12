import instance from "@/config/instance";
export const getAllTags = async () => {
	const data = await instance.get(`tags/getAllTags`);
	return data;
};
export const hiddentag = async (id: string | boolean) => {
	const data = await instance.delete(`tags/delete/${id}`);
	return data;
};

export const unhiddentag = async (id: string | boolean) => {
	const data = await instance.put(`tags/unDelete/${id}`);
	return data;
};
