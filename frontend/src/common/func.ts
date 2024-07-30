export const formatCurrency = (value: number | string) => {
	return Number(value).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
};
export function formatQuantitySort(num: number | string) {
	num = Number(num);
	if (num >= 1000 && num < 1000000) {
		return (num / 1000).toFixed(1) + "k";
	} else if (num >= 1000000 && num < 1000000000) {
		return (num / 1000000).toFixed(1) + "M";
	} else if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1) + "B";
	} else {
		return num.toString();
	}
}
