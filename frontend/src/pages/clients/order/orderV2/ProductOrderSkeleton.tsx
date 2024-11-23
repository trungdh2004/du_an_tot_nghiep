import React from "react";

const ProductOrderSkeleton = () => {
	return (
		<div className="rounded-md border border-gray-200 px-7 py-6 flex flex-col gap-4">
			{" "}
			<div className="max-w-full flex items-center justify-between animate-pulse">
				<div className="flex gap-3 items-center">
					<div className="w-[90px] lg:h-[90px] h-[110px] bg-gray-300 rounded object-cover"></div>
					<div className="flex flex-col gap-2 w-full">
						<div className="h-6 bg-gray-300 rounded w-[230px]"></div>
						<div className="flex gap-3 items-center">
							<div className="h-4 bg-gray-300 rounded w-16"></div>
							<div className="w-[1px] h-5 bg-gray-300"></div>
							<div className="h-4 bg-gray-300 rounded w-16"></div>
						</div>
						<div className="lg:hidden md:block block">
							<div className="h-4 bg-gray-300 rounded w-12"></div>
						</div>
						<div className="lg:hidden md:block block">
							<div className="h-4 bg-gray-300 rounded w-24"></div>
						</div>
						<div className="lg:hidden md:block block">
							<div className="h-4 bg-gray-300 rounded w-24"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductOrderSkeleton;
