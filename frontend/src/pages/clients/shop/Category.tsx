import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getAllCategory } from "@/service/category-admin";
import { SearchObjectTypeProduct } from "@/types/searchObjecTypes";
import { useQueryClient } from "@tanstack/react-query";
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";
interface Props {
	setSearchParamsObject:  Dispatch<SetStateAction<SearchObjectTypeProduct>>;
}
const Category = ({ setSearchParamsObject }: Props) => {
	const [category, setCategory] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = useQueryClient();
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllCategory();
				setCategory(data.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	useEffect(() => {
		const paramsObject: any = Object.fromEntries(searchParams.entries());
		setSearchParamsObject((prev) => ({
			...prev,
			category: paramsObject.category,
		}));
	}, [searchParams, setSearchParamsObject]);
	const handleSearchCategory = (id: string) => {
		searchParams.set("category", id);
		setSearchParams(searchParams);
		const paramsObject: any = Object.fromEntries(searchParams.entries());
		setSearchParamsObject((prev) => ({
			...prev,
			category: paramsObject.category,
		}));
		query.invalidateQueries({ queryKey: ["productShop"] });
	};
	return (
		<div className="w-full rounded-lg flex flex-col gap-3">
			<h3 className="text-uppercase  font-semibold leading-7 tracking-wide lg:text-base md:text-sm sm:text-xs">
				Danh mục sản phẩm
			</h3>

			<div className="flex flex-col">
				{category?.map((cate: any) => {
					return (
						<Label
							className={cn(
								`relative max-w-40 max-h-[50px] overflow-hidden flex items-center font-thin border-[#e9e9e9] cursor-pointer py-2 gap-2 rounded  bg-white hover:underline has-[:checked]:underline has-[:checked]:font-bold`,
							)}
						>
							<input
								type="radio"
								hidden
								name="choose-color"
								id={cate._id}
								value={cate._id}
								checked={
									searchParams.get("category") === cate._id ? true : false
								}
								onClick={() => handleSearchCategory(cate._id)}
							/>
							<span
								className={cn(
									`lg:text-base md:text-sm sm:text-xs `,
									searchParams.get("category") === cate._id
										? "font-bold"
										: "font-normal",
								)}
							>
								{cate.name}
							</span>
						</Label>
					);
				})}
			</div>

			<hr />
		</div>
	);
};

export default Category;
