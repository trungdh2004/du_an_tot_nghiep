import { SearchObjectTypeProduct } from '@/types/searchObjecTypes';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { CiStar } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
interface Props {
	setSearchParamsObject: Dispatch<SetStateAction<{} | SearchObjectTypeProduct>>;
}
const SortFilterStar = ({ setSearchParamsObject }:Props) => {
	const [rating, setRating] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<div className="w-full flex flex-col gap-3 lg:py-2 pb-8">
			<h3 className="text-uppercase py-1 font-semibold leading-7 tracking-wide lg:text-base md:text-sm sm:text-xs">
				Đánh giá
			</h3>
			<div
				className="flex cursor-pointer gap-1"
				
			>
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
			</div>
			<div
				className="flex cursor-pointer gap-1"
				
			>
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
			</div>
			<div
				className="flex cursor-pointer gap-1"
				
			>
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
			</div>
			<div
				className="flex cursor-pointer gap-1"
				
			>
				<FaStar className="text-yellow-400" size={15} />
				<FaStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
			</div>
			<div
				className="flex cursor-pointer gap-1"
				
			>
				<FaStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
				<FaRegStar className="text-yellow-400" size={15} />
			</div>
		</div>
	);
};

export default SortFilterStar