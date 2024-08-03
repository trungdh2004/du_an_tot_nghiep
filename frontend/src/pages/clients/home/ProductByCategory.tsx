import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import ProductsByCategory from "./ProductsByCategory";
import { getAllCateActive } from "@/service/category-active";
type CategoryType = {
	_id: string;
	index: number;
	category: {
		_id: string;
		deleted: string;
		description: string;
		name: string;
		slug: string;
	};
};
const ProductByCategory = () => {
	const [categorySelect, setCategorySelect] = useState("");
	const [category, setCategory] = useState<CategoryType[]>();
	useEffect(() => {
		(async () => {
			const { data } = await getAllCateActive();
			setCategorySelect((data?.data as CategoryType[])[0]?.category?._id);
			setCategory(data?.data);
		})();
	}, []);
	return (
		<div className="bg-neutral-100/70 mt-20 py-5">
			<div className="flex flex-col items-center justify-center gap-y-12">
				<h2 className="justify-center text-3xl md:text-4xl 2xl:text-5xl font-semibold   text-neutral-900 dark:text-neutral-50">
					Bắt đầu khám phá
				</h2>
				<ScrollArea className="max-sm:w-[300px] whitespace-nowrap rounded-full bg-white box-shadow">
					<div className="flex w-max space-x-4 p-1">
						{category?.map((c) => (
							<div
								key={c._id}
								onClick={() => setCategorySelect(c?.category?._id)}
								className={cn(
									"overflow-hidden  rounded-3xl cursor-pointer px-3.5 py-2 text-sm sm:px-7 sm:py-3 capitalize",
									categorySelect == c?.category?._id &&
										"bg-blue-500 text-white",
								)}
							>
								<span>{c?.category?.name}</span>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<ProductsByCategory id={categorySelect} />
				<div className="flex items-center justify-center ">
					<Link
						to={"/shop"}
						className="flex items-center px-7 py-2 bg-blue-400 hover:bg-blue-700 text-white rounded-lg"
					>
						Xem thêm <GrFormNextLink />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductByCategory;
