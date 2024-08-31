import { formatCurrency } from "@/common/func";
import { Button } from "@/components/ui/button";
import { confirmOrder } from "@/service/order";
import { formatInTimeZone } from "date-fns-tz";
import React from "react";

const OrderInforAddress = ({ data, getOrderById }: any) => {
	console.log(data);
	// const dateString = data.createdAt;
	// const formattedDate = format(new Date(data.createdAt), "dd/MM/yyyy HH:mm:ss");
	const handleChangeOrder = async (id: string) => {
		try {
			const data = await confirmOrder(id);
			getOrderById();
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="col-span-1">
			<div className="flex flex-col gap-5">
				<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
					<h3 className="font-medium">Chi tiết</h3>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Mã đơn hàng</p>
						<p className="text-sm">{data.code}</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Ngày đặt hàng</p>
						<p className="text-sm">
							{data?.createdAt
								? formatInTimeZone(
										new Date(data.createdAt),
										"Asia/Ho_Chi_Minh",
										"dd/MM/yyyy HH:mm:ss",
									)
								: "Ngày giờ không hợp lệ"}
						</p>
					</div>

					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Tổng tiền</p>
						<p className="font-medium text-sm text-red-500">
							{formatCurrency(data.totalMoney)}
						</p>
					</div>
				</div>
				<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
					<h3 className="font-medium">Ghi chú</h3>
					<p className="text-sm w-40 break-words">{data.note}</p>
				</div>
				<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
					<h3 className="font-medium">Địa chỉ đặt hàng</h3>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Họ và tên</p>
						<p className="text-sm">{data?.address?.username}</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Số điện thoại</p>
						<p className="text-sm">{data?.address?.phone}</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Địa chỉ</p>
						<p className="text-sm w-44 break-words">{data?.address?.address}</p>
					</div>
				</div>
				<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
					<h3 className="font-medium">Phương thức thanh toán</h3>
					<div className="flex justify-between">
						<p className="font-medium text-sm text-black">Phương thức</p>
						<p className="text-sm">
							{data.paymentMethod === 1
								? "Thanh toán khi nhận hàng"
								: "Thanh toán bằng VNPAY"}
						</p>
					</div>
					{data.paymentMethod === 2 && (
						<div className="flex flex-col gap-3">
							<div className="flex justify-between">
								<p className="font-medium text-sm text-black">Ngân hàng</p>
								<p className="text-sm">{data.payment.bankCode}</p>
							</div>
							<div className="flex justify-between">
								<p className="font-medium text-sm text-black">Thẻ</p>
								<p className="text-sm">{data.payment.cardType}</p>
							</div>
							<div className="flex justify-between">
								<p className="font-medium text-sm text-black">Mã giao dịch</p>
								<p className="text-sm">{data.payment.transactionId}</p>
							</div>
							<div className="flex justify-between">
								<p className="font-medium text-sm text-black">Ngày giao dịch</p>
								<p className="text-sm">
									{data.payment.createdAt &&
										formatInTimeZone(
											new Date(data.payment.createdAt),
											"Asia/Ho_Chi_Minh",
											"dd/MM/yyyy HH:mm:ss",
										)}
								</p>
							</div>
						</div>
					)}
				</div>
				{data.status === 1 && (
					<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
						<h3 className="font-medium">Xác nhận</h3>
						<Button
							className="bg-[#369de7] hover:bg-[#5eb3f0]"
							onClick={() => handleChangeOrder(data._id)}
						>
							Xác nhận
						</Button>
					</div>
				)}

				<div className="bg-main rounded-md border flex gap-4 flex-col border-1 border-gray-100 box-shadow p-4">
					<h3 className="font-medium">Lựa chọn giao hàng</h3>
					{data.status === 2 && (
						<Button className="bg-[#369de7] hover:bg-[#5eb3f0]">
							Lựa chọn
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrderInforAddress;
