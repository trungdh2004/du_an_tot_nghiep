import { getAllProductSlide } from "@/service/product-slide";
import { IProductSlider } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
const Carousel = () => {
	const [productSlide, setProductSlide] = useState<IProductSlider[]>([]);
	useEffect(() => {
		(async () => {
			const { data } = await getAllProductSlide();
			setProductSlide(data?.data);
		})();
	}, []);
	const swiperRef = useRef<SwiperType>();
	return (
		<div>
			<div className="padding flex flex-col sm:flex-row items-end sm:items-center justify-between">
				<h2 className="text-2xl font-semibold sm:text-4xl sm:font-bold">
					Khám phá nhiều hơn. <span>Những điều tốt đẹp đang chờ đợi bạn</span>
				</h2>
				<div className="flex items-center gap-7 *:flex *:items-center *:justify-center *:size-10 *:max-w-10 *:max-h-10 *:rounded-full *:border *:border-gray-200">
					<button onClick={() => swiperRef.current?.slidePrev()}>
						<PiArrowLeftThin size={32} className="text-slate-700" />
					</button>
					<button onClick={() => swiperRef.current?.slideNext()}>
						<PiArrowRightThin size={32} className="text-slate-700" />
					</button>
				</div>
			</div>
			<div className="pl-4 md:pl-[50px] mt-6 md:mt-14">
				<Swiper
					className="h-[250px]"
					// install Swiper modules
					height={250}
					modules={[Navigation]}
					spaceBetween={0}
					loop={true}
					slidesPerView={1}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 20,
							height: 250,
						},
						// when window width is >= 480px
						480: {
							slidesPerView: 1.5,
							spaceBetween: 30,
							height: 250,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 30,
							height: 250,
						},
						1024: {
							slidesPerView: 2.5,
							spaceBetween: 66,
							height: 250,
						},
					}}
				>
					{productSlide?.map((slide) => (
						<SwiperSlide className="h-full " key={slide?._id}>
							<div className="h-full flex items-center justify-between bg-[#FFEAEA] rounded-lg p-5">
								<div className="absolute flex flex-col h-4/5 justify-between">
									<div className="max-w-xs">
										<span className="block mb-2 text-sm text-slate-700">
											{slide?.label}
										</span>
										<h2 className="max-w-[177px] text-xl md:text-2xl text-slate-900 font-semibold text-wrap">
											{slide?.title}
										</h2>
									</div>
									<div className="mt-auto">
										<button className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6   bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
											Mua ngay
										</button>
									</div>
								</div>
								<div className="flex-1" />

								<div className="max-sm:w-[150px] md:w-[193px] md:h-[209px]">
									<img
										src={slide?.thumbnail}
										alt=""
										className="w-full h-full"
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Carousel;
