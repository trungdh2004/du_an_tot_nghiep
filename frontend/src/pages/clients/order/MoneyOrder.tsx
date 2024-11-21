import { formatCurrency } from "@/common/func";
import { ObjectCheckoutOrder } from "@/types/ObjectCheckoutOrder";
import { IOrderMoneyValue } from "@/types/order";
import React, { useState } from "react";
import { MdOutlineEventNote } from "react-icons/md";

interface Props {
	data: any;
	handleCheckout: () => void;
	setOrderCheckout: (order: any) => void;
	orderCheckout: ObjectCheckoutOrder;
	moneyVoucher: IOrderMoneyValue | null;
}
const MoneyOrder = ({
	data,
	handleCheckout,
	setOrderCheckout,
	orderCheckout,
	moneyVoucher,
}: Props) => {
	const [paymentMethod, setPaymentMethod] = useState<string>("1");
	const arrayTotal = data?.data?.map((product: any) => {
		return product.totalAmount;
	});
	console.log(data?.data);

	const totalCost = arrayTotal?.reduce(
		(acc: number, value: number) => acc + value,
		0,
	);
	return (
		<div className="py-4 bg-white border border-gray-200 rounded-none lg:rounded-md md:rounded-md">
			<div className="py-4 lg:pr-4 md:pr-4 px-4">
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<MdOutlineEventNote size={20} />
						<h3 className="lg:text-lg text-base font-medium">
							Chi tiết thanh toán
						</h3>
					</div>
					<div className="flex justify-between">
						<p className="lg:text-base md:text-base text-sm">Tổng tiền hàng</p>
						<span className="">{formatCurrency(totalCost)}</span>
					</div>
					{orderCheckout.addressId !== undefined && (
						<div className="flex justify-between">
							<p className="lg:text-base md:text-base text-sm">
								Phí vận chuyển
							</p>
							<span className="">
								{totalCost != 0
									? formatCurrency(orderCheckout?.shippingCost as number)
									: formatCurrency(0)}
							</span>
						</div>
					)}

					{moneyVoucher !== null && (
						<div className="flex justify-between gap-3">
							<p className="lg:text-base md:text-base text-sm">Giảm giá</p>
							<span className="">
								- {formatCurrency(moneyVoucher?.amount as number)}
							</span>
						</div>
					)}

					<div className="flex items-center justify-between gap-2">
						<p className="lg:text-base md:text-base text-sm">
							Tổng thanh toán :
						</p>
						<span className="lg:text-2xl md:text-xl text-xl text-[#f78138]">
							{totalCost === 0
								? formatCurrency(0)
								: orderCheckout.addressId === undefined
									? formatCurrency(0)
									: moneyVoucher !== null
										? formatCurrency(
												totalCost +
													(orderCheckout?.shippingCost as number) -
													(moneyVoucher?.amount as number),
											)
										: formatCurrency(
												totalCost + (orderCheckout?.shippingCost as number),
											)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoneyOrder;
