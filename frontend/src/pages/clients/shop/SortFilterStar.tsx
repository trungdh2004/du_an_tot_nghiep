import { cn } from "@/lib/utils";
import { SearchObjectTypeProduct } from "@/types/searchObjecTypes";
import { useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaAngleDown, FaAngleUp, FaRegStar, FaStar } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
interface Props {
	setSearchParamsObject: Dispatch<SetStateAction<SearchObjectTypeProduct>>;
}
const SortFilterStar = ({ setSearchParamsObject }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [check, setCheck] = useState(false);
	const query = useQueryClient();
	const [rating, setRating] = useState<number>(0);

	const handleRatingChange = (rating: string) => {
		setRating(parseInt(rating));
		searchParams.set("rating", rating);
		setSearchParams(searchParams);
		const paramsObject: any = Object.fromEntries(searchParams.entries());
		setSearchParamsObject((prev) => ({
			...prev,
			rating: parseInt(paramsObject.rating),
		}));
	};
	return (
		<div className="w-full flex flex-col lg:py-2 pb-8">
			<div
				className="flex justify-between items-center cursor-pointer"
				onClick={!check ? () => setCheck(true) : () => setCheck(false)}
			>
				<h3 className="text-uppercase py-2 font-semibold leading-7 tracking-wide lg:text-base md:text-sm sm:text-xs">
					Đánh giá
				</h3>
				{!check ? (
					<FaAngleDown
						className="cursor-pointer transition-transform"
						onClick={() => setCheck(true)}
					/>
				) : (
					<FaAngleUp
						className="cursor-pointer transition-transform"
						onClick={() => setCheck(false)}
					/>
				)}
			</div>
			<div
				className={cn(
					"transition-all duration-200 overflow-hidden flex flex-col gap-y-3",
					check ? "max-h-full opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div
					className={cn(
						"flex cursor-pointer gap-1 rounded-full p-2 pr-6",
						rating === 5 && "bg-gray-200 ",
					)}
					onClick={() => handleRatingChange("5")}
				>
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
				</div>
				<div
					className={cn(
						"flex cursor-pointer gap-1 rounded-full p-2 pr-6",
						rating === 4 && "bg-gray-200 ",
					)}
					onClick={() => handleRatingChange("4")}
				>
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
				</div>
				<div
					className={cn(
						"flex cursor-pointer gap-1 rounded-full p-2 pr-6",
						rating === 3 && "bg-gray-200 ",
					)}
					onClick={() => handleRatingChange("3")}
				>
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
				</div>
				<div
					className={cn(
						"flex cursor-pointer gap-1 rounded-full p-2 pr-6",
						rating === 2 && "bg-gray-200 ",
					)}
					onClick={() => handleRatingChange("2")}
				>
					<FaStar className="text-yellow-400" size={15} />
					<FaStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
				</div>
				<div
					className={cn(
						"flex cursor-pointer gap-1 rounded-full p-2 pr-6",
						rating === 1 && "bg-gray-200",
					)}
					onClick={() => handleRatingChange("1")}
				>
					<FaStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
					<FaRegStar className="text-yellow-400" size={15} />
				</div>
			</div>
		</div>
	);
};

export default SortFilterStar;
