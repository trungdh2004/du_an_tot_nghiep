import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import ProductV2 from "@/components/common/ProductV2";
import { IProduct } from "@/types/typeProduct";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "swiper/css";
import "swiper/css/navigation";
interface Props {
	product: IProduct[];
}
const ProductRelated = ({ product }: Props) => {
	const [isBlock, setIsBlock] = useState(false);
	useEffect(() => {
		if (product.length > 4) {
			setIsBlock(true);
		} else {
			setIsBlock(false);
		}
	}, [product]);
	return (
		<div>
			<div className="py-[40px] flex justify-center items-center gap-2 ">
				<div className="border-b-2 w-[100px] border-black"></div>
				<h3 className="lg:text-[30px] text-[16px] text-center">
					Sản phẩm liên quan
				</h3>
				<div className="border-b-2 w-[100px] border-black"></div>
			</div>
			{product?.length === 0 ? (
				<div>
					<p className="text-[14px] text-center py-6">
						Không tìm thấy sản phẩm nào
					</p>
				</div>
			) : (
				<div className="relative pb-6">
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
						{product?.map((product: IProduct) => {
							return (
								<SwiperSlide className="lg:w-[260px] w-[240px] group">
									<ProductV2 product={product} />
								</SwiperSlide>
							);
						})}
					</Swiper>

					<button
						className={`btn-next ${!isBlock && "hidden"} absolute z-20 top-[39%] right-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 cursor-pointer`}
					>
						<GrLinkNext />
					</button>
					<button
						className={`btn-prev ${!isBlock && "hidden"} absolute z-20 top-[39%] left-4 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 cursor-pointer`}
					>
						<GrLinkPrevious />
					</button>
				</div>
			)}
		</div>
	);
};

export default ProductRelated;
