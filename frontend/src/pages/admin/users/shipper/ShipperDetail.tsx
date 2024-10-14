import { ReactNode, useEffect, useState } from "react";
import { optimizeCloudinaryUrl } from "@/common/localFunction";
import { getDetailShipperById } from "@/service/shipper";
import { IShipperDetail } from "@/types/shipper.interface";
import { AxiosError } from "axios";
import { FaMapMarkerAlt, FaRegAddressCard, FaLock } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LiaBirthdayCakeSolid, LiaMapMarkedAltSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaTruckFast } from "react-icons/fa6";
import { TbBasketCancel } from "react-icons/tb";
import ChartOrderShipper from "./ChartOrderShipper";

const UserShipperDetail = () => {
	const { id } = useParams();
	const [infoDetailShipper, setInfoDetailShipper] = useState<IShipperDetail>();
	const [orderStats, setOrderStats] = useState({
		successful: 0,
		inProgress: 0,
		failed: 0,
	});

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getDetailShipperById(id as string);
				delete data.message;
				setInfoDetailShipper(data);
				setOrderStats({
					successful: data.successfulOrders || 0,
					inProgress: data.inProgressOrders || 0,
					failed: data.failedOrders || 0,
				});
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data?.message);
				}
			}
		})();
	}, [id]);

	const chartData = [
		{ name: "Thành công", orders: orderStats.successful, color: "#4CAF50" },
		{ name: "Đang giao", orders: orderStats.inProgress, color: "#2196F3" },
		{ name: "Thất bại", orders: orderStats.failed, color: "#F44336" },
	];

	return (
		<div className="">
			<h4 className="text-base font-medium md:text-xl">
				Thông tin chi tiết người giao hàng
			</h4>
			<div className="mt-3">
				<div className="overflow-hidden border rounded-xl box-shadow">
					<div className="flex items-center p-6">
						<div className="flex flex-col items-center mb-6">
							<img
								src={optimizeCloudinaryUrl(infoDetailShipper?.shipper?.avatar as string, 120, 120)}
								alt=""
								className="object-cover w-32 h-32 mb-4 border-4 border-gray-200 rounded-full"
							/>
							<h3 className="text-base font-medium md:text-lg">
								{infoDetailShipper?.shipper?.fullName}
							</h3>
						</div>
						<div className="grid grid-cols-1 gap-y-1.5">
							<InfoField
								icon={<FaRegAddressCard className="text-gray-400" />}
								label="Số căn cước"
								value={infoDetailShipper?.shipper?.idCitizen as string}
							/>
							<InfoField
								icon={<FiPhone className="text-gray-400" />}
								label="Điện thoại"
								value={infoDetailShipper?.shipper?.phone as string}
							/>
							<InfoField
								icon={<LiaBirthdayCakeSolid className="text-gray-400" />}
								label="Ngày sinh"
								value={new Date(infoDetailShipper?.shipper?.birthDate as string).toLocaleDateString()}
							/>
							<InfoField
								icon={<FaMapMarkerAlt className="text-gray-400" />}
								label="Địa chỉ"
								value={infoDetailShipper?.shipper?.address as string}
							/>
						</div>
						<div className="flex justify-center mt-8">
							<button className="flex items-center px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline">
								<FaLock className="mr-2" />
								Khóa tài khoản
							</button>
						</div>
					</div>
				</div>
				{/* <div className="p-6 border rounded-xl box-shadow">
					<h5 className="mb-6 text-base font-medium md:text-lg">
						Biểu đồ thống kê đơn hàng
					</h5>
					<ChartOrderShipper />
					<div className="flex items-center justify-center gap-6 mt-6">
						<LegendItem color="bg-green-500" label="Thành công" />
						<LegendItem color="bg-blue-500" label="Đang giao" />
						<LegendItem color="bg-red-500" label="Thất bại" />
					</div>
				</div> */}
			</div>
			<div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
				<StatCard
					icon={<LiaMapMarkedAltSolid size={40} className="text-green-500" />}
					count={orderStats.successful}
					label="Đơn hàng giao thành công"
				/>
				<StatCard
					icon={<FaTruckFast size={40} className="text-blue-500" />}
					count={orderStats.inProgress}
					label="Đơn hàng đang giao"
				/>
				<StatCard
					icon={<TbBasketCancel size={40} className="text-red-500" />}
					count={orderStats.failed}
					label="Đơn hàng giao thất bại"
				/>
			</div>
		</div>
	);
};

const InfoField = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
	<div className="flex items-center ">
		<div className="mr-3 text-xl">{icon}</div>
		<div>
			<p className="text-sm font-medium text-gray-500">{label}</p>
			<p className="text-base text-gray-800">{value}</p>
		</div>
	</div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
	<div className="flex items-center gap-2">
		<div className={`w-4 h-4 rounded-full ${color}`}></div>
		<p className="text-sm text-gray-600">{label}</p>
	</div>
);

const StatCard = ({
	icon,
	count,
	label,
}: {
	icon: ReactNode;
	count: number;
	label: string;
}) => (
	<div className="flex items-center gap-4 p-6 border rounded-xl box-shadow">
		{icon}
		<div>
			<p className="text-base font-medium md:text-lg">{count} Đơn hàng</p>
			<p className="text-sm text-gray-600">{label}</p>
		</div>
	</div>
);

export default UserShipperDetail;