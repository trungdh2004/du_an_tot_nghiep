import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const OrderTracking = ({ data }: any) => {
	console.log(data);

	return (
		<div className="bg-main rounded-lg  box-shadow p-5 border border-1 border-gray-200">
			<h3 className="my-5">Chi tiết theo dõi đơn hàng</h3>
			<div className="flex items-center justify-between w-full">
				<div className="relative flex flex-col items-center">
					<div className="w-10 h-10 flex items-center justify-center">
						<FaRegCircleCheck
							size={35}
							className={cn(
								"text-gray-500",
								data.createdAt ||
									data.confirmedDate ||
									data.shippingDate ||
									data.shippedDate ||
									data.deliveredDate
									? "text-blue-500"
									: "",
							)}
						/>
					</div>
					<span className="mt-2 text-black text-sm">Đã Đặt Hàng</span>
					<span className="text-sm text-gray-500">
						{data?.createdAt
							? formatInTimeZone(
									new Date(data.createdAt),
									"Asia/Ho_Chi_Minh",
									"dd/MM/yyyy HH:mm:ss",
								)
							: "Ngày giờ không hợp lệ"}
					</span>
				</div>

				<div
					className={cn(
						"flex-auto border-t-2 border-gray-500 pb-12",
						data.confirmedDate ||
							data.shippingDate ||
							data.shippedDate ||
							data.deliveredDate
							? "border-blue-500"
							: "",
					)}
				/>

				<div className="relative flex flex-col items-center">
					<div className="w-10 h-10 flex items-center justify-center">
						<FaRegCircleCheck
							size={35}
							className={cn(
								"text-gray-500",
								data.confirmedDate ||
									data.shippingDate ||
									data.shippedDate ||
									data.deliveredDate
									? "text-blue-500"
									: "",
							)}
						/>
					</div>
					<span className="mt-2 text-black text-sm">Xác nhận</span>
					<span className="text-sm text-gray-500">
						{data?.confirmedDate
							? formatInTimeZone(
									new Date(data.confirmedDate),
									"Asia/Ho_Chi_Minh",
									"dd/MM/yyyy HH:mm:ss",
								)
							: "Chưa xác nhận"}
					</span>
				</div>

				<div
					className={cn(
						"flex-auto border-t-2 border-gray-500 pb-12",
						data.shippingDate || data.shippedDate || data.deliveredDate
							? "border-blue-500"
							: "",
					)}
				/>

				<div className="relative flex flex-col items-center">
					<div className="w-10 h-10 flex items-center justify-center">
						<FaRegCircleCheck
							size={35}
							className={cn(
								"text-gray-500",
								data.shippingDate || data.shippedDate || data.deliveredDate
									? "text-blue-500"
									: "",
							)}
						/>
					</div>
					<span className="mt-2 text-black text-sm">
						Chuyển đơn vị giao hàng
					</span>
					<span className="text-sm text-gray-500">
						{data?.shippingDate
							? formatInTimeZone(
									new Date(data.shippingDate),
									"Asia/Ho_Chi_Minh",
									"dd/MM/yyyy HH:mm:ss",
								)
							: "Chưa xác nhận"}
					</span>
				</div>

				<div
					className={cn(
						"flex-auto border-t-2 border-gray-500 pb-12",
						data.shippedDate || data.deliveredDate ? "border-blue-500" : "",
					)}
				/>

				<div className="relative flex flex-col items-center">
					<div className="w-10 h-10 flex items-center justify-center">
						<FaRegCircleCheck
							size={35}
							className={cn(
								"text-gray-500",
								data.shippedDate || data.deliveredDate ? "text-blue-500" : "",
							)}
						/>
					</div>
					<span className="mt-2 text-black text-sm">Giao hàng</span>
					<span className="text-sm text-gray-500">
						{data?.shippedDate
							? formatInTimeZone(
									new Date(data.shippedDate),
									"Asia/Ho_Chi_Minh",
									"dd/MM/yyyy HH:mm:ss",
								)
							: "Chưa xác nhận"}
					</span>
				</div>
				<div
					className={cn(
						"flex-auto border-t-2 border-gray-500 pb-12",
						data.deliveredDate ? "border-blue-500" : "",
					)}
				/>

				<div className="relative flex flex-col items-center">
					<div className="w-10 h-10 flex items-center justify-center">
						<FaRegCircleCheck
							size={35}
							className={cn(
								"text-gray-500",
								data.deliveredDate ? "text-blue-500" : "",
							)}
						/>
					</div>
					<span className="mt-2 text-black text-sm">Đã nhận hàng</span>
					<span className="text-sm text-gray-500">
						{data?.deliveredDate
							? formatInTimeZone(
									new Date(data.deliveredDate),
									"Asia/Ho_Chi_Minh",
									"dd/MM/yyyy HH:mm:ss",
								)
							: "Chưa xác nhận"}
					</span>
				</div>
		
			</div>
		</div>
	);
};

export default OrderTracking;
