import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import ProductsByCategory from "./ProductsByCategory";
import { getAllCateActive } from "@/service/category-active";
import { getAllCate } from "@/service/category-admin";
type CategoryType = {
	_id: string;
	deleted: string;
	description: string;
	name: string;
	slug: string;
};
const ProductByCategory = () => {
	const [categorySelect, setCategorySelect] = useState("");
	const [category, setCategory] = useState<CategoryType[]>();
	useEffect(() => {
		(async () => {
			const { data } = await getAllCate();
			setCategorySelect((data?.data as CategoryType[])[0]?._id);
			setCategory(data?.data);
		})();
	}, []);
	return (
		<div className="py-8 mt-20  padding">
			<div className="flex flex-col items-center justify-center gap-y-12">
				<h2 className="text-2xl font-semibold text-center sm:text-4xl sm:font-bold">
					Đa dạng mẫu mã sản phẩm
				</h2>
				<ScrollArea className="max-sm:w-[300px] whitespace-nowrap rounded-full bg-white box-shadow">
					<div className="flex p-1 space-x-4 w-max">
						{category?.map((c) => (
							<div
								key={c._id}
								onClick={() => setCategorySelect(c?._id)}
								className={cn(
									"overflow-hidden  rounded-3xl cursor-pointer px-2 py-1 text-sm sm:px-7 sm:py-2 capitalize",
									categorySelect == c?._id &&
										"bg-blue-500 text-white",
								)}
							>
								<span>{c?.name}</span>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<ProductsByCategory id={categorySelect} />
				<div className="flex items-center justify-center ">
					<Link
						to={"/shop"}
						className="flex items-center py-2 text-white bg-blue-400 rounded-lg px-7 hover:bg-blue-700"
					>
						Xem thêm <GrFormNextLink />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductByCategory;
