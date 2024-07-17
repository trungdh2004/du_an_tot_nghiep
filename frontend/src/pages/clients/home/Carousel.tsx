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
	const slides = [
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
		{
			tag: "Khám phá mới",
			title: "Mua sắm mới nhất tại shop chúng tôi",
			img: "image 11.png",
		},
	];
	return (
		<div>
			<div className="padding flex flex-col sm:flex-row items-end sm:items-center justify-between">
				<h2 className="text-2xl font-semibold sm:text-4xl sm:font-bold">
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
			<div className="pl-4 md:pl-[50px] mt-6 md:mt-14">
				<Swiper
					className="swiper-container"
					// install Swiper modules
					modules={[Navigation]}
					spaceBetween={24}
					loop={true}
					slidesPerView={1.5}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					breakpoints={{
						640: {
							slidesPerView: 2.5,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 2.5,
							spaceBetween: 66,
						},
					}}
				>
					{slides?.map((slide) => (
						<SwiperSlide className="min-w-[298px]">
							<div className="flex items-start justify-between bg-[#FFEAEA] p-4 pb-6 md:p-9 md:pt-3 rounded-lg">
								<div className="">
									<p className="text-sm font-medium">{slide.tag}</p>
									<h3 className="text-base md:text-xl font-semibold max-w-[190px] my-4 sm:mt-5 sm:mb-8 md:mt-7 md:mb-11">
										{slide?.title}
									</h3>
									<Link
										to={"/shop"}
										className="text-sm font-medium py-1.5 px-3 md:py-2 md:px-5 bg-white rounded-3xl"
									>
										Mua ngay
									</Link>
								</div>
								<div className="max-w-[99px] max-h-[111px] md:w-[193px] md:h-[209px]">
									<img src={slide?.img} alt="" className="w-full h-full" />
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
