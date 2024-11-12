import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { LuBadgeCheck } from "react-icons/lu";

const Banner = () => {
	return (
		<div className="w-full min-h-20  mt-16 border-b">
			<div className="w-full h-12 bg-red-500 overflow-hidden flex items-center relative">
				<div className="run-text text-1 text-white text-sm md:text-base font-semibold uppercase flex items-center gap-2">
					<LuBadgeCheck size={20} className="text-white" />{" "}
					<span>Hàng chính hàng 100%</span>
				</div>
				<div className="run-text text-2 text-white text-sm md:text-base font-semibold uppercase flex items-center gap-2">
					<MdOutlineLocalShipping size={20} className="text-white" />{" "}
					<span>Giao hàng nhanh gọn</span>
				</div>
				<div className="run-text text-3 text-white text-sm md:text-base font-semibold uppercase flex items-center gap-2">
					<MdPayments size={20} className="text-white" />
					<span>Thanh toán khi nhận hàng (COD)</span>
				</div>
			</div>
			<div className="w-full ">
				<img src="/banner.webp" alt="" className="object-contain" />
			</div>
			<div className="lg:h-[120px] w-full grid grid-cols-4 gap-4 padding">
				<div className="w-full flex items-center gap-2">
					<div className="size-10 ">
						{" "}
						<img src="./runShipper.webp" alt="" />
					</div>
					<div>
						<h4 className="font-semibold ">Miễn phí vận chuyển đơn từ 499K</h4>
						<span className="text-sm">Nhận hàng trong 2-5 ngày</span>
					</div>
				</div>
				<div className="w-full flex items-center gap-2">
					<div className="size-10 ">
						{" "}
						<img src="./runShipper.webp" alt="" />
					</div>
					<div>
						<h4 className="font-semibold ">Miễn phí vận chuyển đơn từ 499K</h4>
						<span className="text-sm">Nhận hàng trong 2-5 ngày</span>
					</div>
				</div>
				<div className="w-full flex items-center gap-2">
					<div className="size-10 ">
						{" "}
						<img src="./runShipper.webp" alt="" />
					</div>
					<div>
						<h4 className="font-semibold ">Miễn phí vận chuyển đơn từ 499K</h4>
						<span className="text-sm">Nhận hàng trong 2-5 ngày</span>
					</div>
				</div>
				<div className="w-full flex items-center gap-2">
					<div className="size-10 ">
						{" "}
						<img src="./runShipper.webp" alt="" />
					</div>
					<div>
						<h4 className="font-semibold ">Miễn phí vận chuyển đơn từ 499K</h4>
						<span className="text-sm">Nhận hàng trong 2-5 ngày</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
