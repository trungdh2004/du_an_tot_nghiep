import MapComponent from "@/components/map/Map";
import instance from "@/config/instance";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker } from "react-map-gl";
import { GoDotFill } from "react-icons/go";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { formatQuantity } from "@/common/localFunction";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const ShipperIndex = () => {
	const { data } = useQuery({
		queryKey: ["listOrder", "shipper"],
		queryFn: async () => {
			try {
				const { data } = await instance.get("/order/shipperOrder");
				return data;
			} catch (error) {
				return [];
			}
		},
	});

	const [locationCurrent, setLocationCurrent] = useState({
		longitude: 105.62583879555804,
		latitude: 21.046006645820455,
		zoom: 15.5,
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((data) => {
			setLocationCurrent({
				longitude: data.coords.longitude,
				latitude: data.coords.latitude,
				zoom: 15.5,
			});
		});
	}, []);

	const listStatus = [
		{
			status:2,
			name:"Giao hàng"
		},
		{
			status:3,
			name:"Đang giao hàng"
		},
		{
			status:4,
			name:"Giao hàng lại"
		},
		{
			status:5,
			name:"Giao thành công"
		},
	]

	return (
		<div className="w-full h-full">
			<MapComponent
				height="100vh"
				longitude={locationCurrent.longitude}
				latitude={locationCurrent.latitude}
			>
				<Marker
					longitude={locationCurrent.longitude}
					latitude={locationCurrent.latitude}
					anchor="bottom"
				>
					<FaMapMarkerAlt size={20} className="text-red-500" />
				</Marker>
				{data &&
					data?.data?.map((item:any) => {
						const location = item?.address?.location?.coordinates;

						return (
							<Marker
								longitude={location[0]}
								latitude={location[1]}
								anchor="bottom"
							>
								<Popover>
									<PopoverTrigger asChild>
										<div>
											<GoDotFill size={20} className="text-red-500" />
										</div>
									</PopoverTrigger>
									<PopoverContent
										className="w-[240px] p-2"
										align="center"
										side="top"
									>
										<div className="">
											<div className="flex items-center pb-2 border-b">
												<Avatar className="w-8 h-8">
													<AvatarImage
														src={item.user.avatar || "/avatar_25.jpg"}
													/>
													<AvatarFallback>U</AvatarFallback>
												</Avatar>
												<p className="text-base font-medium ml-2">
													{item.address.username}
												</p>
											</div>
											<p>
												Mã đơn hàng:{" "}
												<span className="font-bold">{item?.code}</span>
											</p>
											<p>
												Tổng số lượng sản phẩm:{" "}
												<span className="font-bold text-red-500">
													{formatQuantity(item?.orderItems?.length, "sp")}
												</span>
											</p>
											<p>
												Tổng giá trị đơn hàng:{" "}
												<span className="font-bold text-red-500">
													{formatQuantity(item?.totalMoney, "đ")}
												</span>{" "}
											</p>
											<p>
												Tiền khách trả khi nhận:{" "}
												<span className="font-bold text-red-500">
													{formatQuantity(item?.amountToPay, "đ")}
												</span>{" "}
											</p>
											<p>
												Giá ship:{" "}
												<span className="font-bold text-red-500">
													{formatQuantity(item?.shippingCost, "đ")}
												</span>{" "}
											</p>
											<p className="line-clamp-2">Lời nhắn: {item.note}</p>
											<div className="pt-2 border-t mt-1">
												<Link target="_blank" to={`/shipper/transport/${encodeURIComponent(item.code)}`}>
													<div className="w-full text-center border rounded-md border-blue-500 text-blue-500 hover:bg-blue-100">
														{listStatus.find(status => status.status === item.status)?.name || "Giao hàng"}
													</div>
												</Link>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</Marker>
						);
					})}
			</MapComponent>
		</div>
	);
};

export default ShipperIndex;
