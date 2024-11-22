import Coupon from "@/components/common/Coupon/Coupon";
import { getVoucherViewHome } from "@/service/voucher";
import { IVoucher } from "@/types/voucher";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ListCoupon = () => {
	const [vouchers, setVouchers] = useState<IVoucher[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getVoucherViewHome(9999999999);
				setVouchers(data?.data);
			} catch (error) {
				if (error instanceof AxiosError) {
					toast?.error(error?.response?.data?.message);
				}
			}
		})();
	}, []);

	return (
		<div className="w-full pt-10 padding">
			<div className="flex items-center justify-between w-full mb-6">
				<div className="flex-1 text-header">Ưu đãi lớn</div>
				<Link
					to={"/vouchers"}
					className="flex items-center gap-1 text-gray-400 cursor-pointer hover:text-gray-700"
				>
					<span className="text-sm">Xem thêm </span>
					<FaAnglesRight size={14} />
				</Link>
			</div>
			<Swiper
				className="flex items-center h-full justify-stretch [&>.swiper-wrapper]:flex [&>.swiper-wrapper]:items-stretch"
				modules={[Autoplay, Pagination]}
				// autoplay={{
				// 	delay: 4000,
				// 	disableOnInteraction: false,
				// }}
				spaceBetween={20} // Khoảng cách giữa các voucher
				breakpoints={{
					320: {
						slidesPerView: 1,
						pagination: { clickable: true }, // Thêm pagination khi ở kích thước mobile
					},
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3.5 },
				}}
				grabCursor={true} // Cho phép kéo bằng tay
				pagination={{ clickable: true }} // Kích hoạt pagination
			>
				{vouchers?.map((voucher) => (
					<SwiperSlide key={voucher?._id} className="flex flex-col items-stretch justify-between flex-1 h-auto">
						<Coupon voucher={voucher} className=" shadow-[rgba(0,0,0,0.05)_0px_3px_10px] h-32" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ListCoupon;
