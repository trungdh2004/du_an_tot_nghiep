import Coupon from "@/components/common/Coupon/Coupon";
import Paginations from "@/components/common/Pagination";
import { IVoucher } from "@/types/voucher";
import React, { useState } from "react";

const VoucherIndex = () => {
	const [vouchers, setVouchers] = useState<IVoucher[]>([]);

	return (
		<div>
			<div className="padding">
				<div className="py-10">
					<div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2  ">
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
						<Coupon voucher={vouchers} className="w-full" />
					</div>
					<div className="flex justify-center pt-8">
						<Paginations />
					</div>
				</div>
			</div>
		</div>
	);
};

export default VoucherIndex;
