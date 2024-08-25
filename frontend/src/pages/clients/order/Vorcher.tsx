import React, { useState } from "react";
import voucher from "@/assets/voucher.png";
import { Input } from "@/components/ui/input";

const Vorcher = () => {
	return (
		<div className="py-2">
			<div className="flex lg:flex-row gap-3 items-center bg-white justify-between py-2 lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
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
				</div>
			</div>
		</div>
	);
};

export default Vorcher;
