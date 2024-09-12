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

export function calculateTimeDistance(pastDate: any) {
	const now = new Date().getTime();
	const oldDate = new Date(pastDate).getTime();
	const diff = now - oldDate; // Khoảng cách tính bằng mili giây
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	if (seconds < 10) {
		return `Vừa xong`;
	}
	if (seconds < 60) {
		return `${seconds} giây trước`;
	} else if (minutes < 60) {
		return `${minutes} phút trước`;
	} else if (hours < 24) {
		return `${hours} giờ trước`;
	} else if (days < 7) {
		return `${days} ngày`;
	} else if (days < 30) {
		const week = Math.floor(days / 7);
		return `${week} tuần`;
	} else if (30 < days && days < 365) {
		const months = Math.floor(days / 30);
		return `${months} tháng`;
	} else {
		const year = Math.floor(days / 365);
		return `${year} năm`;
	}
}
