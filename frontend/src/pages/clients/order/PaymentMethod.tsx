import { formatCurrency } from "@/common/func";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { MdOutlineEventNote } from "react-icons/md";

const PaymentMethod = ({ data, handleCheckout, setOrderCheckout }: any) => {
	const [paymentMethod, setPaymentMethod] = useState<string>("1");
	const arrayTotal = data?.data?.map((product: any) => {
		return product.totalAmount;
	});
	const totalCost = arrayTotal?.reduce(
		(acc: number, value: number) => acc + value,
		0,
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
								`relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-2 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`,
							)}
						>
							<input
								className="peer"
								onChange={(e) => {
									setPaymentMethod(e.target.value);
									setOrderCheckout((prev: any) => {
										return { ...prev, paymentMethod: e.target.value };
									});
								}}
								type="radio"
								hidden
								name="choose-size"
								id="paymentMethod1"
								value="1"
								checked={paymentMethod === "1"}
							/>
							<span className="capitalize lg:text-base md:text-base text-sm">
								Thanh toán khi nhận hàng
							</span>
						</Label>
						<Label
							htmlFor={"paymentMethod2"}
							className={cn(
								`relative max-w-80 max-h-[50px] overflow-hidden flex items-center border border-solid border-line border-[#e9e9e9] cursor-pointer py-2 px-4 gap-2 rounded  bg-white hover:text-[#ee4d2d]   hover:border-[#ee4d2d]  has-[:checked]:text-[#ee4d2d]   has-[:checked]:border-[#ee4d2d]`,
							)}
						>
							<input
								className="peer"
								hidden
								type="radio"
								name="paymentMethod"
								id="paymentMethod2"
								value="2"
								checked={paymentMethod === "2"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                  setOrderCheckout((prev: any) => {
										return { ...prev, paymentMethod: e.target.value };
									});
                }}
							/>
							<span className="capitalize lg:text-base md:text-base text-sm">
								Thanh toán VNPAY
							</span>
						</Label>
					</div>
				</div>
				<hr />
				<div className="self-end py-4 lg:pr-4 md:pr-4 px-4">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<MdOutlineEventNote size={20} />
							<h3 className="lg:text-lg text-base font-medium">
								Chi tiết thanh toán
							</h3>
						</div>
						<div className="flex justify-between">
							<p className="lg:text-base md:text-base text-sm">
								Tổng tiền hàng
							</p>
							<span className="">{formatCurrency(totalCost)}</span>
						</div>
						<div className="flex justify-between">
							<p className="lg:text-base md:text-base text-sm">
								Phí vận chuyển
							</p>
							<span className="">{formatCurrency(10000)}</span>
						</div>
						<div className="flex justify-between gap-3">
							<p className="lg:text-base md:text-base text-sm">
								Giảm giá phí vận chuyển
							</p>
							<span className="">{formatCurrency(3000)}</span>
						</div>
						<div className="flex items-center lg:justify-start md:justify-start justify-between gap-2">
							<p className="lg:text-base md:text-base text-sm">
								Tổng thanh toán :
							</p>
							<span className="lg:text-2xl md:text-xl text-xl text-[#f78138]">
								{formatCurrency(totalCost + 10000 - 3000)}
							</span>
						</div>
					</div>
				</div>
				<hr />
				<div className="lg:flex md:flex hidden justify-between py-2 mx-4">
					<p>
						Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
						Shopee
					</p>
					<Button className="px-9" onClick={()=>handleCheckout()}>Đặt hàng</Button>
				</div>
				<div className="lg:hidden md:hidden fixed flex bottom-0 z-[10] h-[50px] w-full bg-white items-center justify-end gap-3 border border-gray-200 ">
					<div className="flex flex-col items-center pt-1">
						<p className="text-sm">Tổng thanh toán</p>
						<span className="text-base self-end text-[#f78138]">
							{formatCurrency(totalCost + 10000 - 3000)}
						</span>
					</div>
					<Button className="px-9 h-full rounded-none">Đặt hàng</Button>
				</div>
			</div>
			<div className="lg:hidden md:hidden block px-4 bg-white border border-gray-200 mt-4 mb-2 py-2">
				<p className="text-sm">
					Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản
					Shopee
				</p>
			</div>
		</div>
	);
};

export default PaymentMethod;