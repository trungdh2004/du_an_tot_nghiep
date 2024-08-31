import LabelChecked from "@/components/common/LabelChecked";
import SkeletonVariant from "./SkeletonVariant";

type Size = {
	id?: string;
	sizeName?: string;
	listColor?: string[];
	quantity?: number;
};

type Props = {
	listSizeExist?: Size[];
	isLoading?: boolean;
	onChoose?: (value: string) => void;
	setExitsListColor?: (value: string[]) => void;
	exitsListSize?: string[];
	setTotalQuantity?: (value: number) => void;
	sizeInput?: "small" | "medium" | "large" | "responsive";
};

const ListSize: React.FC<Props> = ({
	isLoading = false,
	listSizeExist = [],
	exitsListSize = [],
	onChoose,
	setExitsListColor,
	setTotalQuantity,
	sizeInput,
}) => {
	const handleChange =
		(size: Size) => (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				onChoose?.(size.id || "");
				setTotalQuantity?.(size.quantity || 0);
				setExitsListColor?.(size.listColor || []);
			} else {
				onChoose?.("");
				setExitsListColor?.([]);
			}
		};

	return (
		<div className="flex max-md:flex-col max-md:gap-3 items-start">
			<h3 className="font-normal text-base text-gray-500 min-w-28 max-w-28">
				Kích thước
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2 w-full">
					{listSizeExist.map((size) => (
						<LabelChecked
							disabled={
								exitsListSize.length > 0 &&
								!exitsListSize.includes(size.id || "")
							}
							onChange={handleChange(size)}
							isOneChecked
							value={size.id || ""}
							key={size.id}
							nameInput="chooseSize"
							size={sizeInput || "responsive"}
						>
							{size.sizeName}
						</LabelChecked>
					))}
				</div>
			)}
		</div>
	);
};

export default ListSize;
