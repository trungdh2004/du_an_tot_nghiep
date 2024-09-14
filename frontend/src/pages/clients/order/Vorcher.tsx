import React, { useState } from "react";
import voucher1 from "@/assets/voucher.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Outofstock from "@/assets/OutofStock.png";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IVoucher } from "@/types/voucher";
import { takeApplyDiscountCode } from "@/service/voucher";
interface Props {
	data: any;
	setOrderCheckout: (order: any) => void;
	setMoneyVoucher: (money: number) => void;
}
const Vorcher = ({ data, setOrderCheckout, setMoneyVoucher }: Props) => {
	const arrayTotal = data?.data?.map((product: any) => {
		return product.totalAmount;
	});

	const totalCost = arrayTotal?.reduce(
		(acc: number, value: number) => acc + value,
		0,
	);
	const [voucher, setVoucher] = useState<IVoucher | null | undefined>(null);
	const [show, setShow] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = async (data: any) => {
		try {
			const check = await takeApplyDiscountCode({
				code: data.voucherCode,
				totalMoney: totalCost,
			});
			setVoucher(check.data.data);
			setShow(true);
			if (check.data.data !== null) {
				setOrderCheckout((prev: any) => {
					return { ...prev, voucher: check.data.data._id };
				});
				setMoneyVoucher(check.data.data.discountValue);
			} else {
				alert("Mã voucher không đúng hoặc đã hết hạn sử dụng!");
			}
		} catch (error) {
			setVoucher(null);
			setShow(true);
			toast.error("Không có voucher nào ");
		}
	};
	return (
		<div className="py-2">
			<div className="flex flex-col bg-white lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
				<div className="flex lg:flex-row gap-3  items-center  justify-between py-2">
					<div className="col-span-3">
						<div className="flex pl-4 gap-3 items-center">
							<img src={voucher1} alt="" className="w-8 h-8" />
							<h3 className="lg:text-lg md:text-base text-sm">Voucher</h3>
						</div>
					</div>
					<div className="flex text-center pr-4 gap-2 items-center">
						<h5 className="lg:text-base text-sm w-[50%]">Mã voucher</h5>
						<form
							action=""
							onSubmit={handleSubmit(onSubmit)}
							className="flex gap-3"
						>
							<Input
								placeholder="Mã giảm giá"
								className="border border-blue-200 ld:text-base text-sm"
								type="text"
								{...register("voucherCode")}
							/>
							<Button>Áp dụng</Button>
						</form>
					</div>
				</div>
				{show &&
					(voucher === null ? (
						<div className="flex justify-center bg-white py-3">
							<h3 className="text-red-400">Bạn chưa có voucher nào</h3>
						</div>
					) : (
						<div className="flex bg-white py-3 pl-4 items-center gap-3">
							<div className="flex items-center gap-4">
								<div className="bg-[#e7e7e7] p-3">
									<img
										src={Outofstock}
										alt=""
										className="rounded-full w-16 h-16"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<h5 className="text-sm font-medium text-gray-700">
										{voucher?.code}
									</h5>
									<h5 className="text-sm font-medium text-gray-700">
										{voucher?.name}
									</h5>
									<p className="text-xs font-light text-gray-500">
										HXD :{" "}
										{voucher?.endDate
											? format(
													new Date(voucher?.endDate),
													"yyyy-MM-dd HH:mm:ss",
												)
											: "Sai time"}
									</p>
								</div>
								
							</div>
							<div
								onClick={() => {
									setVoucher(null);
									setShow(false);
									setOrderCheckout((prev: any) => {
										return { ...prev, voucher: null };
									});
									reset();
								}}
							>
								<FaRegCircleXmark
									size={20}
									className="text-red-400 cursor-pointer"
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Vorcher;
