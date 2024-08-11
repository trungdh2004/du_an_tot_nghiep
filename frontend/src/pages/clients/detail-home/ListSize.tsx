import LabelChecked from "@/components/common/LabelChecked";
import { getAllSize } from "@/service/size-admin";
import { ISize } from "@/types/variants";
import { useQuery } from "@tanstack/react-query";
import SkeletonVariant from "./SkeletonVariant";

const ListSize = () => {
	const { data: listSize, isLoading } = useQuery<ISize[]>({
		queryKey: ["GET_SIZES"],
		queryFn: async () => {
			const { data } = await getAllSize();
			await new Promise<void>((resolve) => setTimeout(resolve, 5000));
			return data.data;
		},
	});
	return (
		<div className="flex items-start ">
			<h3 className="font-normal text-base text-gray-500  min-w-28 max-w-28">
				Kích thước
			</h3>
			{isLoading ? (
				<SkeletonVariant />
			) : (
				<div className="flex flex-wrap items-center gap-2">
					{listSize?.map((size) => (
						<LabelChecked
							isOneChecked
							value={size._id as string}
							key={size._id}
							nameInput="chooseSize"
							className="min-w-28"
						>
							{size.name}
						</LabelChecked>
					))}
					{listSize?.map((size) => (
						<LabelChecked
							isOneChecked
							value={size._id as string}
							key={size._id}
							nameInput="chooseSize"
							className="min-w-28"
						>
							{size.name}
						</LabelChecked>
					))}
					{listSize?.map((size) => (
						<LabelChecked
							isOneChecked
							value={size._id as string}
							key={size._id}
							nameInput="chooseSize"
							className="min-w-28"
						>
							{size.name}
						</LabelChecked>
					))}
					{listSize?.map((size) => (
						<LabelChecked
							isOneChecked
							value={size._id as string}
							key={size._id}
							nameInput="chooseSize"
							className="min-w-28"
						>
							{size.name}
						</LabelChecked>
					))}
					{listSize?.map((size) => (
						<LabelChecked
							isOneChecked
							value={size._id as string}
							key={size._id}
							nameInput="chooseSize"
							className="min-w-28"
						>
							{size.name}
						</LabelChecked>
					))}
				</div>
			)}
		</div>
	);
};

export default ListSize;
