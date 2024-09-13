import instance from "@/config/instance";
const url = "voucher";
export const takeApplyDiscountCode = (payload: {
	code: string;
	totalMoney: number;
}) => {
	return instance.post(`${url}/getCheck`, payload);
};
