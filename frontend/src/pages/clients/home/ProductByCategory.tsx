import { getAllCate } from "@/service/category-admin";
import { Link } from "react-router-dom";

import { ICategory } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { FaAnglesRight } from "react-icons/fa6";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ProductByCategory = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["getAllCate"],
		queryFn: async () => {
			try {
				const { data } = await getAllCate();
				console.log("all cate", data);

				return data?.data;
			} catch (error) {
				return [];
			}
		},
	});

	return (
		<div className="py-10 padding">
			<div className="flex flex-col items-center justify-center gap-y-12">
				<div className="flex justify-between items-center w-full">
					<div className="text-header flex-1">Đa dạng mẫu mã sản phẩm</div>
					<Link
						to={"/shop"}
						className="text-gray-400 hover:text-gray-700 cursor-pointer flex items-center gap-1"
					>
						<span className="text-sm">Xem thêm </span>
						<FaAnglesRight size={14} />
					</Link>
				</div>

				<div className="w-full md:px-8 relative">
					<Swiper
						slidesPerView={6}
						spaceBetween={20}
						freeMode={true}
						loop={true}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
						navigation={{
							nextEl: ".btn-next-cate",
							prevEl: ".btn-prev-cate",
						}}
						slidesOffsetAfter={20}
						slidesOffsetBefore={20}
						className="swiper-wrapper  cursor-pointer"
						modules={[FreeMode, Navigation,Autoplay]}
						breakpoints={{
							320: {
								slidesPerView: 3,
								spaceBetween: 16,
							},
							480: {
								slidesPerView: 4,
								spaceBetween: 20,
							},
							760:{
								slidesPerView: 5,
								spaceBetween: 30,
							},
							1024: {
								slidesPerView: 6,
								spaceBetween: 40,
							},
						}}
					>
						{!isLoading &&
							data?.map((item: ICategory) => (
								<SwiperSlide key={item?._id} className="">
									<Link
										to={`/shop?category=${item?._id}`}
										className="flex flex-col justify-start items-center gap-2"
										key={item?._id}
									>
										<div className="size-14 md:size-20 lg:size-[100px] rounded-full border">
											<img src={item?.thumbnail} alt="" />
										</div>
										<div className="text-base lg:text-xl font-medium">{item?.name}</div>
									</Link>
								</SwiperSlide>
							))}
						{isLoading &&
							Array.from({ length: 10 }, (item,index) => (
								<SwiperSlide key={index} className="">
									<Skeleton className="size-[100px] rounded-full" />
								</SwiperSlide>
							))}
					</Swiper>
					{/* <Carousel className=" w-full ">
						<CarouselPrevious />

						<CarouselContent className="-ml-1">
							{data?.map((item: ICategory) => (
								<CarouselItem
									key={item?._id}
									className="pl-1 basis-1/2 md:basis-1/4 lg:basis-[16%]"
								>
									<div
										className="flex flex-col justify-center items-center gap-2"
										key={item?._id}
									>
										<div className="size-[100px] rounded-full border">
											<img src={item?.thumbnail} alt="" />
										</div>
										<div className="text-xl font-medium">{item?.name}</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselNext />
					</Carousel> */}

					{/* {isLoading && (
						<>
							<Skeleton className="size-[100px] rounded-full" />
						</>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default ProductByCategory;
