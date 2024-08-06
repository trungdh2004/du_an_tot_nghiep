import { Skeleton } from "@/components/ui/skeleton";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {
	images?: {
		url: string;
		_id?: string;
	}[],
	isLoading: boolean
}
const Ablum = ({images,isLoading}:Props) => {
	return (
		<div className="w-full p-5">
			<Swiper
				pagination={{
					type: "fraction",
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="mySwiper"
			> 
			{isLoading ? <SwiperSlide  className="">
					<div className="">
						<Skeleton className="w-[485px] h-[485px]"/>
					</div>
				</SwiperSlide> : images?.map((image) =><SwiperSlide key={image._id} className="">
					<div className="">
						<img
							src={image?.url}
							alt=""
							className="w-full h-full"
							loading="lazy"
						/>
					</div>
				</SwiperSlide>)}
			
				
				
			</Swiper>
		</div>
	);
};

export default Ablum;
