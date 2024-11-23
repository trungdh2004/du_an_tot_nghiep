import ProductV2 from "@/components/common/ProductV2";
import { listProductHot } from "@/service/product";
import { IProduct } from "@/types/typeProduct";
import { useQuery } from "@tanstack/react-query";
import { FaAnglesRight } from "react-icons/fa6";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ListProductHot = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["getListHost"],
		queryFn: async () => {
			try {
				const { data } = await listProductHot();
				return data?.listProduct;
			} catch (error) {
				return [];
			}
		},
	});

	return (
		<div className="py-10 padding">
			<div className="flex justify-between items-center w-full">
				<div className="text-header flex-1">Sản phẩm nổi bật</div>
				<Link
					to={"/shop"}
					className="text-gray-400 hover:text-gray-700 cursor-pointer flex items-center gap-1"
				>
					<span className="text-sm">Mua ngay</span>
					<FaAnglesRight size={14} />
				</Link>
			</div>

			{/* {!isLoading &&
					} */}

			<div className="relative pb-6 w-full pt-10">
				<Swiper
					modules={[Navigation]}
					loop={false}
					spaceBetween={20}
					slidesPerView={4}
					pagination={{ clickable: true }}
					navigation={{
						nextEl: ".btn-next",
						prevEl: ".btn-prev",
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
					className={`btn-next  absolute z-10 top-[39%] right-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 bg-gray-100 bg-opacity-70 hover:bg-gray-100 duration-300 cursor-pointer`}
				>
					<GrLinkNext />
				</button>
				<button
					className={`btn-prev  absolute z-10 top-[39%] left-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 bg-gray-100 bg-opacity-70 hover:bg-gray-100 duration-300 cursor-pointer`}
				>
					<GrLinkPrevious />
				</button>
			</div>
		</div>
	);
};

export default ListProductHot;
