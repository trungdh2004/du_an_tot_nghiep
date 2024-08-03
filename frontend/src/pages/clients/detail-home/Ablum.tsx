import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Ablum = () => {
	return (
		<div className="w-full">
			<Swiper
				pagination={{
					type: "fraction",
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className="">
						<img
							src="https://i.pinimg.com/736x/42/43/03/424303bef006eb35803ae00505248d7a.jpg"
							alt=""
							className="w-full h-full"
							loading="lazy"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="">
						<img
							src="https://i.pinimg.com/736x/42/43/03/424303bef006eb35803ae00505248d7a.jpg"
							alt=""
							className="w-full h-full"
							loading="lazy"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Ablum;
