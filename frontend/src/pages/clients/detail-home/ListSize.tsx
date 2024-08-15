import LabelChecked from "@/components/common/LabelChecked";
import SkeletonVariant from "./SkeletonVariant";

type Props = {
	listSizeExist?: {
		id?: string;
		sizeName?: string;
		listColor?: string[];
		quantity?: number;
	}[];
	isLoading?: boolean;
	onChoose?: (value: string) => void;
	setExitsListColor?: (value: string[]) => void;
	exitsListSize?: string[];
	setTotalQuantity?: (value: number) => void;
};
const ListSize = ({
	isLoading,
	listSizeExist,
	exitsListSize,
	onChoose,
	setExitsListColor,
	setTotalQuantity,
}: Props) => {
	return (
		<div className="flex items-start ">
			<h3 className="font-normal text-base text-gray-500  min-w-28 max-w-28">
				Kích thước
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2">
					{listSizeExist?.map((size) => (
						<LabelChecked
							disabled={
								Number(exitsListSize?.length) > 0
									? !exitsListSize?.includes(size?.id as string)
									: false
							}
							onChange={(e: Event) => {
								const elementInput = e?.target as HTMLInputElement;
								if (elementInput.checked) {
									onChoose && onChoose(String(size?.id));
									const currentColor = listSizeExist?.find(
										(c) => c.id === size?.id,
									);
									setTotalQuantity?.(Number(size?.quantity));
									setExitsListColor?.(currentColor?.listColor as string[]);
								} else {
									onChoose && onChoose("");
									setExitsListColor?.([]);
								}
							}}
							isOneChecked
							value={size.id as string}
							key={size.id}
							nameInput="chooseSize"
							className="min-w-28"
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
