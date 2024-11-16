import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { IOrderMoneyValue } from "@/types/order";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface Props {
	data: any;
	setOrderCheckout: (order: any) => void;
	setMoneyVoucher: Dispatch<SetStateAction<IOrderMoneyValue | null>>;
	stateOrder: any;
}
const Vorcher = ({
	data,
	setOrderCheckout,
	setMoneyVoucher,
	stateOrder,
}: Props) => {
	const [voucher, setVoucher] = useState<IVoucher | null | undefined>(
		data?.voucher,
	);
	const [show, setShow] = useState(false);
	const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: any) => {
		try {
			const check = await takeApplyDiscountCode({
				code: data.voucherCode,
				listId: stateOrder.listId,
			});
			console.log(check);

			setVoucher(check.data.voucher);
			setShow(true);
			if (check.data !== null) {
				setOrderCheckout((prev: any) => {
					return { ...prev, voucher: check.data.voucher._id };
				});
				setMoneyVoucher(check.data.valueCheck);
			} else {
				alert("Mã voucher không đúng hoặc đã hết hạn sử dụng!");
			}
		} catch (error) {
			setVoucher(null);
			setShow(true);
			setOrderCheckout((prev: any) => {
				return { ...prev, voucher: null };
			});
			setMoneyVoucher(null);
			toast.error("Không có voucher nào ");
		}
	};

	useEffect(() => {
		if (data?.voucherMain) {
			console.log("data:", data?.voucherMain);
			setOrderCheckout((prev: any) => {
				return { ...prev, voucher: data?.voucherMain?.voucher?._id };
			});
			setVoucher(data?.voucherMain?.voucher);
			setMoneyVoucher({ amount: data?.voucherMain?.amountVoucher });
			setShow(true);
		}
	}, [data]);
	// console.log(voucher.voucher);

	return (
		<div className="py-2">
			<div className="flex flex-col bg-white lg:rounded-md md:rounded-md rounded-none border border-gray-200 box-shadow">
				<div className="flex lg:flex-row gap-3  items-center  justify-between py-2">
					<div className="col-span-3">
						<div className="flex pl-4 gap-3 items-center">
							<img src={voucher1} alt="" className="w-8 h-8" />
							<h3 className="lg:text-lg md:text-base text-sm hidden md:block">
								Voucher
							</h3>
						</div>
					</div>
					<div className="flex text-center pr-4 gap-2 items-center">
						<h5 className="lg:text-base text-sm w-[50%] hidden md:block">
							Mã voucher
						</h5>
						<form
							action=""
							onSubmit={handleSubmit(onSubmit)}
							className="flex items-center w-full gap-2 md:w-min md:justify-end max-sm:flex-col"
						>
							<div className="relative w-full md:w-52 ">
								<input
									placeholder="Nhập mã giảm giá"
									type="text"
									className="w-full outline-none border border-gray-200 bg-gray-100 h-8 md:h-10 p-1.5"
									{...register("voucherCode")}
								/>
								<div className="absolute top-1/2 -translate-y-1/2 right-1.5 size-5 bg-black/30 rounded-full flex items-center justify-center cursor-pointer">
									<IoClose
										className="text-white"
										onClick={() => {
											reset();
										}}
									/>
								</div>
							</div>
							<Button
								className={cn(
									"h-8 md:h-10 w-full md:w-40 bg-red-500 hover:bg-red-600 text-white px-5",
								)}
							>
								Áp dụng
							</Button>
						</form>
					</div>
				</div>

				{show &&
					(voucher === null ? (
						<div className="flex justify-center bg-white py-3">
							<h3 className="text-red-400">Bạn chưa có voucher nào</h3>
						</div>
					) : (
						<div className="p-2">
							<div className="flex p-1 items-center border rounded-md justify-between pr-2 max-w-[400px]">
								<div className="flex items-center gap-3 flex-1">
									<div className="bg-orange-500 p-2 rounded-sm">
										<img
											src={`/NUC_white.svg`}
											alt=""
											className="rounded-full w-16 h-16"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-sm font-medium text-gray-700">
											Giảm {voucher?.discountValue}
											{voucher?.discountType === 1
												? "đ"
												: `%, giảm tối đa ${voucher?.maxAmount}đ`}
										</p>
										<p className="text-sm text-gray-600">
											Đơn tối thiểu : {voucher?.minimumOrderValue}đ
										</p>
										<p className="text-xs font-light text-gray-500">
											HXD :
											{voucher?.endDate
												? format(new Date(voucher?.endDate), "yyyy-MM-dd")
												: "Sai time"}{" "}
											- {voucher?.type === "1" ? "Tất cả" : "Một số sản phẩm"}
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
										setMoneyVoucher(null);
										reset();
									}}
								>
									<FaRegCircleXmark
										size={20}
										className="text-red-400 cursor-pointer hover:text-red-600"
									/>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Vorcher;
