import { IListColorAttribute, IListSizeAttribute } from "@/types/product";
import { useCallback } from "react";
type TypeExitsColorSizeAttribute = {
	listColor?: IListColorAttribute[];
	listSize?: IListSizeAttribute[];
};
const useExitsColorSizeAttribute = (product: TypeExitsColorSizeAttribute) => {
	const handleStateInfoProduct = useCallback(() => {
		if (!product) return { listColorExist: [], listSizeExist: [] };

		const listColorExist =
			product.listColor?.map((color) => ({
				id: color.colorId,
				colorCode: color.colorCode,
				colorName: color.colorName,
				listSize: color.list
					?.map((item) => item.size?._id)
					.filter(Boolean) as string[],
			})) || [];

		const listSizeExist =
			product.listSize?.map((size) => ({
				id: size.sizeId,
				sizeName: size.sizeName,
				listColor: size.list
					?.map((item) => item.color?._id)
					.filter(Boolean) as string[],
			})) || [];

		return { listColorExist, listSizeExist };
	}, [product]);
	return handleStateInfoProduct();
};
export { useExitsColorSizeAttribute };
