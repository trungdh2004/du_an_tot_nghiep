import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useExitsColorSizeAttribute } from "@/hooks/cart";
import {
	IAttribute,
	IListColorAttribute,
	IListSizeAttribute,
} from "@/types/product";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import ListColor from "../detail-home/ListColor";
import ListSize from "../detail-home/ListSize";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";

type Props = {
	product?: {
		_id?: string;
		listColor?: IListColorAttribute[];
		listSize?: IListSizeAttribute[];
	};
	attributeAlreadyExists?: {
		listColor?: string[];
		listSize?: string[];
	};
	attribute?: IAttribute;
	handleChangeAttributes?: (colorId: string, sizeId: string) => void;
};
interface IStateInfoProduct {
	listColorExist: {
		id: string;
		colorCode: string;
		colorName: string;
		listSize: string[];
	}[];
	listSizeExist: {
		id: string;
		sizeName: string;
		listColor: string[];
	}[];
}
const Attribute = ({
	product,
	attribute,
	attributeAlreadyExists,
	handleChangeAttributes,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [attributesId, setAttributesId] = useState({
		sizeId: "",
		colorId: "",
	});
	const [exitsListSize, setExitsListSize] = useState<string[]>([]);
	const [exitsListColor, setExitsListColor] = useState<string[]>([]);
	const [stateInfoProduct, setStateInfoProduct] = useState<IStateInfoProduct>({
		listColorExist: [],
		listSizeExist: [],
	});
	const { listSizeExist, listColorExist } = useExitsColorSizeAttribute(
		product as any,
	);
	console.log(">>>product", product);

	useEffect(() => {
		if (!isOpen) {
			resetAttributes();
		}
	}, [isOpen]);
	const handleStateInfoProduct = useCallback(() => {
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
	}, []);

	useEffect(() => {
		setStateInfoProduct(handleStateInfoProduct());
	}, [product, handleStateInfoProduct]);
	const resetAttributes = () => {
		setAttributesId({ sizeId: "", colorId: "" });
		setExitsListColor([]);
		setExitsListSize([]);
	};

	const handleColorChange = (colorId: string) => {
		setAttributesId((prev) => ({ ...prev, colorId }));
	};

	const handleSizeChange = (sizeId: string) => {
		setAttributesId((prev) => ({ ...prev, sizeId }));
	};

	const handleConfirm = () => {
		handleChangeAttributes?.(attributesId.colorId, attributesId.sizeId);
		setIsOpen(false);
	};

	const animationMenu = {
		open: { rotate: "180deg" },
		closed: { rotate: 0 },
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild className="outline-none">
				<button className="text-sm text-left text-gray-500 outline-none">
					<div className="flex items-end gap-1">
						Phân loại sản phẩm{" "}
						<motion.div
							initial={false}
							animate={isOpen ? "open" : "closed"}
							variants={animationMenu}
						>
							<RiArrowDownSFill size={20} />
						</motion.div>
					</div>
					<div className="text-sm text-left text-gray-500">
						{attribute?.color?.name}, {attribute?.size?.name}
					</div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-80 px-5 py-3">
				<div className="space-y-3">
					<ListColor
						onChoose={handleColorChange}
						validExits
						widthLabel={120}
						listColorExist={stateInfoProduct?.listColorExist}
						exitsListColor={exitsListColor}
						colorIdChecked={attribute?.color?._id}
						sizeInput={isMobile ? "mobile" : "small"}
						selectedColor={attributeAlreadyExists?.listColor}
						setExitsListSize={setExitsListSize}
					/>
					<ListSize
						validExits
						widthLabel={120}
						listSizeExist={stateInfoProduct?.listSizeExist}
						exitsListSize={exitsListSize}
						sizeIdChecked={attribute?.size?._id}
						setExitsListColor={setExitsListColor}
						sizeInput={isMobile ? "mobile" : "small"}
						selectedSize={attributeAlreadyExists?.listSize}
						onChoose={handleSizeChange}
					/>
				</div>
				<div className="flex items-center justify-end gap-3 mt-5">
					<Button
						onClick={() => setIsOpen(false)}
						className="bg-transparent hover:bg-gray-50 outline-none text-gray-500 w-24 h-8 md:h-10 md:w-40 py-0.5"
					>
						Trở lại
					</Button>
					<Button
						onClick={handleConfirm}
						className="bg-blue-500 hover:bg-blue-600 outline-none w-24 h-8 md:h-10 md:w-40 py-0.5"
					>
						Xác nhận
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Attribute;
