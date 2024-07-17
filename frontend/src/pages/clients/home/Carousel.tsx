import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import "swiper/css/navigation";
import "swiper/css";
import { Link } from "react-router-dom";
const Carousel = () => {
	const swiperRef = useRef<SwiperType>();
	return (
		<div>
			<div className="padding flex items-center justify-between">
				<h2 className="text-4xl font-bold">
					Discover more. Good things are waiting for you
				</h2>
				<div className="flex items-center gap-7 *:flex *:items-center *:justify-center *:size-10 *:max-w-10 *:max-h-10 *:rounded-full *:border *:border-gray-200">
					<button onClick={() => swiperRef.current?.slidePrev()}>
						<GrFormPreviousLink size={32} />
					</button>
					<button onClick={() => swiperRef.current?.slideNext()}>
						<GrFormNextLink size={32} />
					</button>
				</div>
			</div>
			<div className="pl-[50px] mt-14">
				<Swiper
					// install Swiper modules
					modules={[Navigation]}
					spaceBetween={50}
					loop={true}
					slidesPerView={2.5}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
				>
					<SwiperSlide className="">
						<div className="flex items-start bg-[#FFEAEA] p-9 pt-3 rounded-lg">
							<div className="">
								<p className="text-sm font-medium">Khám phá mới</p>
								<h3 className="text-xl font-semibold max-w-[190px] mt-7 mb-11">
									Mua sắm mới nhất tại shop chúng tôi
								</h3>
								<Link
									to={"/shop"}
									className="text-sm font-medium py-2 px-5 bg-white rounded-3xl"
								>
									Mua ngay
								</Link>
							</div>
							<div className="w-[193px] h-[209px]">
								<img src="image 11.png" alt="" className="w-full h-full" />
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="">
						<div className="flex items-start bg-[#FFEAEA] p-9 pt-3 rounded-lg">
							<div className="">
								<p className="text-sm font-medium">Khám phá mới</p>
								<h3 className="text-xl font-semibold max-w-[190px] mt-7 mb-11">
									Mua sắm mới nhất tại shop chúng tôi
								</h3>
								<Link
									to={"/shop"}
									className="text-sm font-medium py-2 px-5 bg-white rounded-3xl"
								>
									Mua ngay
								</Link>
							</div>
							<div className="w-[193px] h-[209px]">
								<img src="image 11.png" alt="" className="w-full h-full" />
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="">
						<div className="flex items-start bg-[#FFEAEA] p-9 pt-3 rounded-lg">
							<div className="">
								<p className="text-sm font-medium">Khám phá mới</p>
								<h3 className="text-xl font-semibold max-w-[190px] mt-7 mb-11">
									Mua sắm mới nhất tại shop chúng tôi
								</h3>
								<Link
									to={"/shop"}
									className="text-sm font-medium py-2 px-5 bg-white rounded-3xl"
								>
									Mua ngay
								</Link>
							</div>
							<div className="w-[193px] h-[209px]">
								<img src="image 11.png" alt="" className="w-full h-full" />
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="">
						<div className="flex items-start bg-[#FFEAEA] p-9 pt-3 rounded-lg">
							<div className="">
								<p className="text-sm font-medium">Khám phá mới</p>
								<h3 className="text-xl font-semibold max-w-[190px] mt-7 mb-11">
									Mua sắm mới nhất tại shop chúng tôi
								</h3>
								<Link
									to={"/shop"}
									className="text-sm font-medium py-2 px-5 bg-white rounded-3xl"
								>
									Mua ngay
								</Link>
							</div>
							<div className="w-[193px] h-[209px]">
								<img src="image 11.png" alt="" className="w-full h-full" />
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default Carousel;
