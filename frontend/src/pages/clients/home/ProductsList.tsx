import ProductV2 from "@/components/common/ProductV2";
import { pagingProduct } from "@/service/product";
import { IProduct } from "@/types/typeProduct";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAnglesRight } from "react-icons/fa6";

const ProductsList = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["productHomeList"],
		queryFn: async () => {
			const { data } = await pagingProduct({
				pageIndex: 1,
				pageSize: 8,
				keyword: "",
			});

			return data?.content;
		},
	});

	return (
		<div className="padding">
			<div className="relative pb-6 w-full pt-10">
				<Swiper
					modules={[Navigation]}
					// loop={true}
					spaceBetween={20}
					slidesPerView={4}
					// autoplay={{
					// 	delay: 2000,
					// 	disableOnInteraction: false,
					// }}
					pagination={{ clickable: true }}
					navigation={{
						nextEl: ".btn-next-product",
						prevEl: ".btn-prev-product",
					}}
					breakpoints={{
						0: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						480: {
							slidesPerView: 3,
							spaceBetween: 25,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 40,
						},
					}}
				>
					{!isLoading &&
						data?.map((product: IProduct) => (
							<SwiperSlide className="lg:w-[260px] w-[240px] group">
								<Link
									key={product?._id}
									to={`/shop/detail/${encodeURIComponent(product?.slug || "")}`}
									className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl group hover:shadow-lg"
								>
									<ProductV2 product={product} />
								</Link>
							</SwiperSlide>
						))}
				</Swiper>

				<button
					className={`btn-next-product  absolute z-20 top-[39%] right-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 cursor-pointer`}
				>
					<GrLinkNext />
				</button>
				<button
					className={`btn-prev-product  absolute z-20 top-[39%] left-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 cursor-pointer`}
				>
					<GrLinkPrevious />
				</button>
			</div>

			<div className="text-center  ">
				<Link to={"/shop"} className="inline-flex items-center justify-center gap-2 group">
					<span className="font-medium text-gray-500">Xem tất cả</span>

					<span className="group-hover:translate-x-4 duration-200">
						<FaAnglesRight size={16} className="text-gray-300" />
					</span>
				</Link>
			</div>
		</div>
	);
};

export default ProductsList;
