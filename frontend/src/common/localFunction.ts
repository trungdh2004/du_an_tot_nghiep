export const formatQuantity = (value: number, end?: string) => {
	if (!value) {
		return "0";
	}
	const formatValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return `${formatValue} ${end ? end : ""}`;
};

export function optimizeCloudinaryUrl(
	url: string,
	width: number | null = null,
	height: number | null = null,
): string {
	const transformations = [
		// "c_lpad",
		"c_fill",
		// "c_limit", // Giữ tỷ lệ khung hình, không cắt ảnh
		"q_auto", // Tự động tối ưu chất lượng
		"f_auto", // Tự động chọn định dạng tốt nhất (webp, avif, ...)
		// "dpr_auto", // Tự động điều chỉnh theo độ phân giải màn hình
		"e_sharpen:2000", // Làm sắc nét ảnh vừa phải
		"dpr_2.0", // Tăng độ phân giải cho các màn hình có dpr cao
		"e_sharpen:100", // Làm sắc nét ảnh hơn
		"e_contrast:50", // Tăng độ tương phản
		"e_saturation:50", // Tăng độ bão hòa màu sắc
		"e_vibrance:50", // Tăng sự sống động của màu sắc
		// "e_hdr:100", // Áp dụng hiệu ứng HDR
	];

	if (width) transformations.push(`w_${width}`);
	if (height) transformations.push(`h_${height}`);

	const transformationString = transformations.join(",");

	// Regex để chèn transformations vào URL
	const regex = /\/upload\/?(?:v\d+\/)?/;
	return url.replace(regex, `/upload/${transformationString}/`);
}
