import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import { Link } from "react-router-dom";
const Sliderv2 = () => {
	return (
		<div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
			<div className="w-full h-full slider-main">
				<div className="relative h-full swiper swiper-slider">
					{/* <div className="swiper-wrapper"> */}
					<Swiper
						className={"swiper-wrapper"}
						modules={[Pagination, Autoplay]}
						pagination={{ clickable: true }}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
					>
						<SwiperSlide className="swiper-slide">
							{/* <div className="swiper-slide"> */}
							<div className="relative w-full h-full slider-item">
								<div className="container relative flex items-center w-full h-full">
									<div className="text-content basis-1/2">
										<div className="text-sub-display">ToinhFashion!</div>
										<div className="mt-2 text-display md:mt-5">
											Nâng tầm phong cách của bạn
										</div>
										<Link to={"/shop"} className="mt-3 button-main md:mt-8">
											Mua Ngay
										</Link>
									</div>
									<div className="sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0">
										<img
											src="/images/sliders/slide-1.png"
											alt="bg1-1"
											className="w-full h-full"
										/>
									</div>
								</div>
							</div>
							{/* </div> */}
						</SwiperSlide>

						<SwiperSlide className="swiper-slide">
							{/* <div className="swiper-slide"> */}
							<div className="relative w-full h-full slider-item">
								<div className="container relative flex items-center w-full h-full">
									<div className="text-content basis-1/2">
										<div className="text-sub-display">ToinhFashion!</div>
										<div className="mt-2 text-display md:mt-5">
											Thể hiện phong cách riêng của bạn
										</div>
										<Link to={"/shop"} className="mt-3 button-main md:mt-8">
											Mua Ngay
										</Link>
									</div>
									<div className="sub-img absolute w-1/2 2xl:-right-[60px] -right-[0] sm:-bottom-[60px] bottom-0">
										<img
											src="/images/sliders/slide-2.png"
											alt="bg1-2"
											className="w-full h-full"
										/>
									</div>
								</div>
							</div>
							{/* </div> */}
						</SwiperSlide>
					</Swiper>
					{/* </div> */}
					<div className="swiper-pagination" />
				</div>
			</div>
		</div>
	);
};

export default Sliderv2;
