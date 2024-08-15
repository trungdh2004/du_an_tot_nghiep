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
};

const ListColor = ({
	listColorExist,
	isLoading,
	onChoose,
	setExitsListSize,
	exitsListColor,
	setTotalQuantity,
}: Props) => {
	return (
		<div className="flex items-start">
			<h3 className="font-normal text-base text-gray-500 min-w-28 max-w-28">
				Màu sắc
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2">
					{listColorExist?.map((color) => (
						<LabelChecked
							disabled={
								Number(exitsListColor?.length) > 0
									? !exitsListColor?.includes(color?.id as string)
									: false
							}
							onChange={(e: Event) => {
								const elementInput = e?.target as HTMLInputElement;
								if (elementInput.checked) {
									onChoose && onChoose(String(color?.id));
									const currentColor = listColorExist?.find(
										(c) => c.id === color?.id,
									);
									setTotalQuantity?.(Number(color?.quantity));
									setExitsListSize?.(currentColor?.listSize as string[]);
								} else {
									onChoose && onChoose("");
									setExitsListSize?.([]);
								}
							}}
							isOneChecked
							value={color?.id as string}
							key={color?.id}
							nameInput="chooseColor"
							haxColor={color?.colorCode}
							className="min-w-28 text-black"
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
