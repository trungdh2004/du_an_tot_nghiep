import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useExitsColorSizeAttribute } from "@/hooks/cart";
import {
	IAttribute,
	IListColorAttribute,
	IListSizeAttribute,
} from "@/types/product";
import ListColor from "../detail-home/ListColor";
import ListSize from "../detail-home/ListSize";
type Size = {
	id?: string;
	sizeName?: string;
	listColor?: string[];
	quantity?: number;
};
type Props = {
	product?: {
		listColor?: IListColorAttribute[];
		listSize?: IListSizeAttribute[];
	};
	attribute?: IAttribute;
	open?: boolean;
};
const Attribute = ({ product, attribute }: Props) => {
	const { listSizeExist, listColorExist } = useExitsColorSizeAttribute(
		product as any,
	);
	console.log(">>>>SIze", attribute);

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<button className="text-sm text-left text-gray-500">
						Phân loại sản phẩm{" "}
						<div className="text-sm text-left text-gray-500">
							{attribute?.color?.name}, {attribute?.size?.name}
						</div>
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-4/5 max-md:max-w-[80%] md:w-auto text-gray-500">
					<div className="space-y-3">
						<ListSize listSizeExist={listSizeExist} sizeInput="small" />
						<ListColor listColorExist={listColorExist} sizeInput="small" />
					</div>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default Attribute;
