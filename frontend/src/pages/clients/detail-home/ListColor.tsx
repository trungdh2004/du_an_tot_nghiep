import LabelChecked from "@/components/common/LabelChecked";
import { getAllColor } from "@/service/color";
import { IColor } from "@/types/variants";
import { useQuery } from "@tanstack/react-query";
import SkeletonVariant from "./SkeletonVariant";

const ListColor = () => {
	const { data: listColor, isLoading } = useQuery<IColor[]>({
		queryKey: ["GET_COLORS"],
		queryFn: async () => {
			const { data } = await getAllColor();
			return data.data;
		},
	});
	return (
		<div className="flex items-start ">
			<h3 className="font-normal text-base text-gray-500  min-w-28 max-w-28">
				Màu sắc
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2">
					{listColor?.map((color) => (
						<LabelChecked
							isOneChecked
							value={color._id as string}
							key={color._id}
							nameInput="chooseColor"
							haxColor={color.code}
						>
							{color.name}
						</LabelChecked>
					))}
				</div>
			)}
		</div>
	);
};

export default ListColor;
