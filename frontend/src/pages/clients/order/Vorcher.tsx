import React, { useState } from "react";
import voucher from "@/assets/voucher.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Outofstock from "@/assets/OutofStock.png";
const Vorcher = () => {
	return (
		<div className="py-2">
			<div className="flex flex-col lg:rounded-md md:rounded-md rounded-none border border-gray-200">
				<div className="flex lg:flex-row gap-3 bg-white items-center  justify-between py-2  box-shadow">
					<div className="col-span-3">
						<div className="flex pl-4 gap-3 items-center">
							<img src={voucher} alt="" className="w-6" />
							<h3 className="lg:text-lg md:text-base text-sm">Voucher</h3>
						</div>
					</div>
					<div className="flex text-center pr-4 gap-2 items-center">
						<h5 className="lg:text-base text-sm w-[50%]">Mã voucher</h5>
						<Input
							placeholder="Mã giảm giá"
							className="border border-blue-200 ld:text-base text-sm"
						/>
						<Button>Áp dụng</Button>
					</div>
				</div>
				<div className="flex justify-center bg-white py-3">
					<h3 className="text-red-400">
						Không có Voucher nào theo yêu cầu của bạn !
					</h3>
				</div>
				<div className="flex bg-white py-3 pl-4">
					<div className="flex items-center gap-4">
						<div className="bg-[#e7e7e7] p-3">
							<img src={Outofstock} alt="" className="rounded-full w-16 h-16" />
						</div>
						<div>
							<h5 className="text-sm font-medium text-gray-700">
								Voucher jajhajajajajajaj
							</h5>
							<p className="text-sm font-light text-gray-500">
								Không còn hạn sử dụng voucher này nữa. Vui lòng chọn voucher
								khác.fdstgry
							</p>
							<p className="text-sm font-light text-gray-500">
								Không còn hạn sử dụng voucher này nữa. Vui lòng chọn voucher
								khác.fdstgry
							</p>
							<p className="text-sm font-light text-gray-500">
								Không còn hạn sử dụng voucher này nữa. Vui lòng chọn voucher
								khác.fdstgry
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Vorcher;
