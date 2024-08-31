import LabelChecked from "@/components/common/LabelChecked";
import SkeletonVariant from "./SkeletonVariant";

type Color = {
	id?: string;
	colorCode?: string;
	colorName?: string;
	listSize?: string[];
	quantity?: number;
};

type Props = {
	listColorExist?: Color[];
	isLoading?: boolean;
	onChoose?: (value: string) => void;
	setExitsListSize?: (value: string[]) => void;
	exitsListColor?: string[];
	setTotalQuantity?: (value: number) => void;
	sizeInput?: "small" | "medium" | "large" | "responsive";
};

const ListColor: React.FC<Props> = ({
	listColorExist = [],
	isLoading = false,
	onChoose,
	setExitsListSize,
	exitsListColor = [],
	setTotalQuantity,
	sizeInput,
}) => {
	const handleChange =
		(color: Color) => (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				onChoose?.(color.id || "");
				setTotalQuantity?.(color.quantity || 0);
				setExitsListSize?.(color.listSize || []);
			} else {
				onChoose?.("");
				setExitsListSize?.([]);
			}
		};

	return (
		<div className="flex max-md:flex-col max-md:gap-3 items-start">
			<h3 className="font-normal text-base text-gray-500 min-w-28 max-w-28">
				Màu sắc
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2 w-full">
					{listColorExist.map((color) => (
						<LabelChecked
							disabled={
								exitsListColor.length > 0 &&
								!exitsListColor.includes(color.id || "")
							}
							onChange={handleChange(color)}
							isOneChecked
							value={color.id || ""}
							key={color.id}
							nameInput="chooseColor"
							haxColor={color.colorCode}
							className="text-black"
							size={sizeInput || "responsive"}
						>
							{color.colorName}
						</LabelChecked>
					))}
				</div>
			)}
		</div>
	);
};

export default ListColor;
