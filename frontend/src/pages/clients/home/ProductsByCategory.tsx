import { formatCurrency, formatQuantitySort } from "@/common/func";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const ProductsByCategory = () => {
	const products = [
		{
			id: 1,
		},
		{
			id: 2,
		},
		{
			id: 3,
		},
		{
			id: 4,
		},
		{
			id: 5,
		},
		{
			id: 6,
		},
	];
	return (
		<Swiper
			slidesPerView={2}
			spaceBetween={20}
			freeMode={true}
			// loop={true}
			slidesOffsetAfter={40}
			slidesOffsetBefore={40}
			className="swiper-wrapper bg-neutral-100/70 cursor-pointer"
			modules={[FreeMode]}
			breakpoints={{
				320: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				480: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				640: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
			}}
		>
			{products?.map((product) => (
				<SwiperSlide
					key={product.id}
					className="max-w-[230px] min-w-[230px] box-shadow rounded-lg overflow-hidden  bg-white"
				>
					<div className="">
						<div className="w-full">
							<img
								src="https://i.pinimg.com/564x/d0/b9/b1/d0b9b19b4275a5d9c56331494e878cbc.jpg"
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="p-3">
							<p>Nike blazer low 77 vintage</p>
							<div className="flex items-center justify-start -space-x-1 *:size-3 *:inline-block  *:rounded-full my-1.5">
								<span
									style={{ background: "#fff" }}
									className="box-shadow border border-black/40"
								></span>
								<span
									style={{ background: "#333" }}
									className="box-shadow border border-black/40"
								></span>
								<span
									style={{ background: "#FF8A4A" }}
									className="box-shadow border border-black/40"
								></span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-red-500">
									{formatCurrency(1551516)}
								</span>
								<span className="text-xs">
									Đã bán {formatQuantitySort(151551)}
								</span>
							</div>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ProductsByCategory;
