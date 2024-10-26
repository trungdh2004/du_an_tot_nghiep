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
	// const [productSlide, setProductSlide] = useState<IProductSlider[]>([]);
	// useEffect(() => {
	// 	(async () => {
	// 		const { data } = await getAllProductSlide();
	// 		setProductSlide(data?.data);
	// 	})();
	// }, []);
	const productSlide = [
		{
			label: "Sản phẩm 1",
			title:
				"huutrung xin chao bạn toi la gi của nahu hih hih csd fdbfd hehe hihi ncnc sascds bfdbfg Lenovo Erazer XT83 II Tai Nghe Thể Thao Không Dây Bluetooth 5.3 HiFi Chống Nước Có Mic",
			_id: Math.random() * 100000,
			thumbnail:
				"https://res.cloudinary.com/dundmo7q8/image/upload/c_fill,q_auto,f_auto,e_sharpen:2000,dpr_2.0,e_sharpen:100,e_contrast:50,e_saturation:50,e_vibrance:50,w_350,h_370/shopApp/ufjllbqcnodkbzzvgp8w.jpg",
		},
		{
			label: "Sản phẩm 1",
			title: "Sản phẩm 2",
			_id: Math.random() * 100000,
			thumbnail:
				"https://res.cloudinary.com/dundmo7q8/image/upload/c_fill,q_auto,f_auto,e_sharpen:2000,dpr_2.0,e_sharpen:100,e_contrast:50,e_saturation:50,e_vibrance:50,w_350,h_370/shopApp/ufjllbqcnodkbzzvgp8w.jpg",
		},
		{
			label: "Sản phẩm 1",
			title: "Sản phẩm 2",
			_id: Math.random() * 100000,
			thumbnail:
				"https://res.cloudinary.com/dundmo7q8/image/upload/c_fill,q_auto,f_auto,e_sharpen:2000,dpr_2.0,e_sharpen:100,e_contrast:50,e_saturation:50,e_vibrance:50,w_350,h_370/shopApp/ufjllbqcnodkbzzvgp8w.jpg",
		},
		{
			label: "Sản phẩm 1",
			title: "Sản phẩm 2",
			_id: Math.random() * 100000,
			thumbnail:
				"https://res.cloudinary.com/dundmo7q8/image/upload/c_fill,q_auto,f_auto,e_sharpen:2000,dpr_2.0,e_sharpen:100,e_contrast:50,e_saturation:50,e_vibrance:50,w_350,h_370/shopApp/ufjllbqcnodkbzzvgp8w.jpg",
		},
		{
			label: "Sản phẩm 1",
			title: "Sản phẩm 2",
			_id: Math.random() * 100000,
			thumbnail: "/NUC.svg",
		},
		{
			label: "Sản phẩm 1",
			title: "Sản phẩm 2",
			_id: Math.random() * 100000,
			thumbnail: "/NUC.svg",
		},
	];
	const swiperRef = useRef<SwiperType>();
	return (
		<div className="py-8 padding">
			<div className=" flex flex-col sm:flex-row items-end sm:items-center justify-between ">
				<h2 className="text-2xl font-semibold sm:text-4xl sm:font-bold">
					Sản phẩm mới mẻ
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
			<div className=" mt-6 md:mt-14">
				<Swiper
					className="h-[200px]"
					// install Swiper modules
					height={200}
					modules={[Navigation]}
					spaceBetween={0}
					loop={false}
					slidesPerView={1}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 20,
							height: 200,
						},
						// when window width is >= 480px
						480: {
							slidesPerView: 1.5,
							spaceBetween: 30,
							height: 200,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 30,
							height: 200,
						},
						1024: {
							slidesPerView: 2.5,
							spaceBetween: 50,
							height: 200,
						},
					}}
				>
					{productSlide?.map((slide) => (
						<SwiperSlide className="h-full " key={slide?._id}>
							<div className="h-full flex items-center justify-between bg-white box-shadow border rounded-lg p-5 relative">
								<div className="flex-1 flex flex-col justify-between h-full z-[2]">
									<div className="">
										<span className="block text-sm text-slate-700">
											{slide?.label}
										</span>
										<h2 className="line-clamp-2 mt-1 text-xl md:text-xl text-slate-900 font-semibold text-wrap">
											{slide?.title}
										</h2>
									</div>
									<div>
										<button className="text-red-500 px-4 py-1 border rounded-full border-red-500 hover:bg-red-500 hover:text-white mt-1 ">
											<span className="leading-4 font-medium">Mua ngay</span>
										</button>
									</div>
								</div>
								<div className="size-[180px] z-[2]">
									<img
										src={slide?.thumbnail}
										alt=""
										className="w-full h-full"
									/>
								</div>

								<div className="absolute top-0 left-0 z-[1] h-full w-1/2 bg-gradient-to-l to-orange-100 from-white rounded-lg "></div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Carousel;
