import instance from "@/config/instance";

export const checkVoucher = async (checkVoucher: {
	code: string;
	totalMoney: number;
}) => {
	const data = await instance.post(`/voucher/getCheck`, checkVoucher);
	return data;
};
