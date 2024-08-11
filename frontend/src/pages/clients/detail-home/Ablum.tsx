import { optimizeCloudinaryUrl } from "@/common/localFunction";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Image {
	url: string;
	_id?: string;
}

interface AlbumProps {
	images?: Image[];
	isLoading: boolean;
}

const Album: React.FC<AlbumProps> = ({ images = [], isLoading }) => {
	const [activeThumb, setActiveThumb] = React.useState<SwiperType | null>(null);
	return (
		<section>
			<div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
				<div className="border-8 bg-white border-white">
					{isLoading ? (
						<Skeleton className="min-w-full min-h-full h-[450px]" />
					) : (
						<Swiper
							modules={[Navigation, Thumbs]}
							loop={true}
							slidesPerView={1}
							navigation={true}
							thumbs={{
								swiper:
									activeThumb && !activeThumb.destroyed ? activeThumb : null,
							}}
							className="thumbShow"
						>
							{images.map((p) => (
								<SwiperSlide key={p._id} className="">
									<img
										src={optimizeCloudinaryUrl(p.url, 500, 500)}
										alt=""
										className="object-cover h-full w-full "
										loading="lazy"
									/>
								</SwiperSlide>
							))}
						</Swiper>
					)}
					{isLoading ? (
						<div className="flex items-center gap-2 mt-5">
							<Skeleton className="h-[82px] w-[82px]" />
							<Skeleton className="h-[82px] w-[82px]" />
							<Skeleton className="h-[82px] w-[82px]" />
							<Skeleton className="h-[82px] w-[82px]" />
						</div>
					) : (
						<Swiper
							onSwiper={setActiveThumb}
							loop={false}
							spaceBetween={10}
							slidesPerView={"auto"}
							modules={[Navigation, Thumbs]}
							className="thumbBtn mt-5"
						>
							{images.map((item) => (
								<SwiperSlide
									key={item?._id}
									className="!w-[82px] !h-[82px] opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100 [&.swiper-slide-thumb-active]:border [&.swiper-slide-thumb-active]:border-blue-500  [&.swiper-slide-thumb-active]:opacity-100"
								>
									<div className="h-full w-full border">
										<img
											src={optimizeCloudinaryUrl(item.url, 120, 120)}
											alt="product images"
											className="object-cover h-full w-full"
											loading="lazy"
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>
		</section>
	);
};

export default Album;
