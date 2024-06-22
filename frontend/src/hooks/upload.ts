import { uploadFileService, uploadMultipleFileService } from "@/service/upload";

export const useUploadFile = () => {
	return async (file: FileList, width?: number, height?: number) => {
		if (typeof file === "object") {
			const formData = new FormData();
			formData.append("image", file[0]);
			const { data } = await uploadFileService(formData, width, height);
			console.log(data);
			return data.path;
		}
	};
};
export const useMultipleImage = () => {
	return (files: FileList, width?: number, height?: number) => {
		if (typeof files === "object") {
			let urlImages;
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append("images", files[i]);
			}

			uploadMultipleFileService(formData, width, height).then(({ data }) => {
				urlImages = data?.map((file: any) => file?.path);
				return urlImages;
			});
		}
	};
};
