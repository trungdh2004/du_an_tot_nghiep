import instance from "@/config/instance";

export const createAccount = (data: any) => {
	const uri = "/auth/register";
	return instance.post(uri, data);
};
export const loginAccount = (data: any) => {
	const uri = "/auth/login";
	return instance.post(uri, data);
};
export const findEmail = (data: any) => {
	const uri = "/auth/forgotPassword";
	return instance.post(uri, data);
};
export const verifyOTP = (data: any) => {
	const uri = "/auth/compareOtp";
	return instance.post(uri, data);
};
export const updateForgotPassword = (data: any) => {
	const uri = "/auth/updateForgotPassword";
	return instance.post(uri, data);
};
export const currentAccount = () => {
	const uri = "/auth/current-user";
	return instance.get(uri);
};
export const socialUser = (data: any) => {
	const uri = "/auth/social-user";
	return instance.post(uri, data);
};
