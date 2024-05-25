import instance from "@/config/instance";

export const createAccount = (data: any) => {
	const uri =
		"/auth/register?utm_source=zalo&utm_medium=zalo&utm_campaign=zaloe";
	return instance.post(uri, data);
};
export const loginAccount = (data: any) => {
	const uri = "/auth/login?utm_source=zalo&utm_medium=zalo&utm_campaign=zaloe";
	return instance.post(uri, data);
};
