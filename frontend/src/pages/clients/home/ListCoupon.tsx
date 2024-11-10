import Coupon from "@/components/common/Coupon/Coupon";
import { getVoucherViewHome } from "@/service/voucher";
import { IVoucher } from "@/types/voucher";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
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
		<div className="w-full padding">
		  <Swiper
  			className="h-full"
  			modules={[Autoplay]}
  			autoplay={{
  				delay: 4000,
  				disableOnInteraction: false,
  			}}
  			spaceBetween={20} // Khoảng cách giữa các voucher
  			breakpoints={{
  				320: { slidesPerView: 1 }, // Di động: hiển thị 1 voucher
  				768: { slidesPerView: 2 }, // Máy tính bảng: hiển thị 2 voucher
  				1024: { slidesPerView: 3.5 }, // Laptop trở lên: hiển thị 3 voucher
  			}}
  			grabCursor={true} // Cho phép kéo bằng tay
  		>
  			{vouchers?.map((voucher) => (
  				<SwiperSlide key={voucher?._id}>
  					<Coupon voucher={voucher} className="w-full" />
  				</SwiperSlide>
  			))}
  		</Swiper>
		</div>
	);
};

export default ListCoupon;
