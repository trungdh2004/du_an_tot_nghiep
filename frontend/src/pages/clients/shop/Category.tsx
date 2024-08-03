import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getAllCategory } from '@/service/category-admin';
import { SearchObjectTypeProduct } from '@/types/searchObjecTypes';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
interface Props {
	setSearchParamsObject: Dispatch<SetStateAction<{} | SearchObjectTypeProduct>>;
}
const Category = (setSearchParamsObject:Props) => {
	const [category, setCategory] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
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
	return (
		<div className="w-2/3 rounded-lg flex flex-col gap-3">
			<h3 className="text-uppercase  font-semibold leading-7 tracking-wide lg:text-lg md:text-base sm:text-sm">
				Danh mục sản phẩm
			</h3>
			<div className="flex flex-col">
				{category?.map((cate: any) => {
					return (
						<Label
							className={cn(
								`relative max-w-40 max-h-[50px] overflow-hidden flex items-center border-[#e9e9e9] cursor-pointer py-2 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d] has-[:checked]:text-[#ee4d2d]`,
							)}
						>
							<input
								type="radio"
								hidden
								name="choose-color"
								id={cate._id}
								value={cate._id}
								onClick={() => {
									searchParams.set("category", cate.slug);
									setSearchParams(searchParams);
								}}
							/>
							<span className="lg:text-base md:text-sm sm:text-xs font-normal">
								{cate.name}
							</span>
						</Label>
					);
				})}
			</div>
		</div>
	);
};

export default Category