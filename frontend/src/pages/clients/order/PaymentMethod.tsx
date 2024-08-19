import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>(
		'Thanh toán khi nhận hàng'
	);
	return (
		<div className="py-2 pb-14">
			<div className="lg:flex flex-col gap-3 bg-white border border-gray-200">
				<div className="p-4">
					<h3 className="text-lg text-[#595959] font-semibold pb-6">
						Phương thức thanh toán
					</h3>
					<div className="flex gap-2">
						<Label
							htmlFor={"paymentMethod1"}
							className={cn(
								`relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`,
							)}
						>
							<input
								className="peer"
								onChange={(e) => setPaymentMethod(e.target.value)}
								type="radio"
								hidden
								name="choose-size"
								id="paymentMethod1"
								value="Thanh toán khi nhận hàng"
								checked={paymentMethod === "Thanh toán khi nhận hàng"}
							/>
							<span className="capitalize">Thanh toán khi nhận hàng</span>
						</Label>
						<Label
							htmlFor={"paymentMethod2"}
							className={cn(
								`relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-3 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`,
							)}
						>
							<input
								className="peer"
								hidden
								type="radio"
								name="paymentMethod"
								id="paymentMethod2"
								value="VNPAY"
								checked={paymentMethod === "VNPAY"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>
							<span className="capitalize">Thanh toán VNPAY</span>
						</Label>
					</div>
				</div>
				<hr />
				<div className="self-end py-4 pr-14">
					<div className="flex flex-col px-5 gap-3">
						<div className="flex justify-between">
							<p>Phí vận chuyển</p>
							<span className="">50000000đ</span>
						</div>
						<div className="flex justify-between">
							<p>Tổng thanh toán :</p>
							<span className="">50000000đ</span>
						</div>
						<div className="flex items-center gap-2">
							<p>Tổng thanh toán :</p>
							<span className="text-xl">50000000đ</span>
						</div>
					</div>
				</div>
				<hr />
				<div className="flex justify-between py-2 px-4">
					<p>
						Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
						Shopee
					</p>
					<Button className="px-9 mr-14">Đặt hàng</Button>
				</div>
			</div>
		</div>
	);
};

export default PaymentMethod;
