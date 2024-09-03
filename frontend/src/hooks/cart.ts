import { IListColorAttribute, IListSizeAttribute } from "@/types/product";
import { useMemo } from "react";

type TypeExitsColorSizeAttribute = {
	_id?: string;
	listColor?: IListColorAttribute[];
	listSize?: IListSizeAttribute[];
};

const useExitsColorSizeAttribute = (product: TypeExitsColorSizeAttribute) => {
	const listAttribute = useMemo(() => {
		if (!product) return { listColorExist: [], listSizeExist: [] };

		const uniqueList = <T extends { id: string }>(list: T[]) => {
			const map = new Map<string, T>();
			list.forEach((item) => {
				if (!map.has(item.id)) {
					map.set(item.id, item);
				}
			});
			return Array.from(map.values());
		};

		const listColorExist = uniqueList(
			product.listColor?.map((color) => ({
				id: color.colorId,
				colorCode: color.colorCode,
				colorName: color.colorName,
				listSize: Array.from(
					new Set(color.list?.map((item) => item.size?._id).filter(Boolean)),
				) as string[],
			})) || [],
		);

		const listSizeExist = uniqueList(
			product.listSize?.map((size) => ({
				id: size.sizeId,
				sizeName: size.sizeName,
				listColor: Array.from(
					new Set(size.list?.map((item) => item.color?._id).filter(Boolean)),
				) as string[],
			})) || [],
		);

		return { listColorExist, listSizeExist };
	}, [product?._id]);

	return listAttribute;
};

export { useExitsColorSizeAttribute };
