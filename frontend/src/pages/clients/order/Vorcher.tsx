import React, { useState } from "react";
import voucher from "@/assets/voucher.png";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Vorcher = () => {
	const [openVoucher, setOpenVoucher] = useState<boolean>(false);
	console.log(openVoucher);

	return (
		<div className="py-2">
			<div className="lg:flex gap-3 bg-white justify-between py-2 border border-gray-200">
				<div className="col-span-3">
					<div className="flex pl-4 gap-3">
						<img src={voucher} alt="" className="w-6" />
						<h3 className="text-lg">Voucher</h3>
					</div>
				</div>
				<div className="flex text-center pr-[70px] gap-2 items-center">
					<h5 className="text-base w-[50%]">Mã voucher</h5>
					<Input placeholder="Mã giảm giá" className="border border-blue-200 "  />
				</div>
			</div>
		</div>
	);
};

export default Vorcher;
