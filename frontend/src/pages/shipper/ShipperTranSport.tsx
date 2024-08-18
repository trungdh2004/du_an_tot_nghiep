import MapComponent from "@/components/map/Map";
import instance from "@/config/instance";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker } from "react-map-gl";
import { formatQuantity } from "@/common/localFunction";

import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import SourcePage from "@/components/map/Source";
import { Button } from "@/components/ui/button";

const ShipperTranSport = () => {
	const { code } = useParams();
    const [isOpen,setIsOpen] = useState(true)

	const { data } = useQuery({
		queryKey: ["listOrder", code],
		queryFn: async () => {
			try {
				const { data } = await instance.get("/order/shipperByCode/" + decodeURIComponent(code as string));
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
        isLoading:false
	});
    const [directions, setDirections] = useState({
		distance:0,
		coords:[]
	});


	useEffect(() => {
		navigator.geolocation.getCurrentPosition((data) => {
			setLocationCurrent({
				longitude: data.coords.longitude,
				latitude: data.coords.latitude,
				zoom: 15.5,
                isLoading:true
			});
		});
	}, []);

    const getRoute = async (start:number[],end:number[]) => {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiZG9odXV0cnVuZyIsImEiOiJjbHVwa20zaDMyZ2ppMmtuem93aDN1eXl3In0.O33vYvx7VEUo7mrZGRbqgA`
        );
        const data = await res.json();
        const coords = data.routes[0].geometry.coordinates;
        setDirections({
			distance:100,
			coords:coords
		});
      };

    useEffect(() => {
        if(locationCurrent.isLoading && data) {
            (
                async () => {
                    try {
                        await getRoute([locationCurrent.longitude, locationCurrent.latitude],[...data?.data?.address?.location?.coordinates])
                    } catch (error) {
                        
                    }
                }
            )()
        }
    },[locationCurrent.isLoading,data])

	const location = data?.data?.address?.location?.coordinates;

	const listStatus = [
		{
			status: 1,
			name: "Chưa xác nhận",
		},
		{
			status: 2,
			name: "Giao hàng",
		},
		{
			status: 3,
			name: "Đang giao hàng",
		},
		{
			status: 4,
			name: "Giao hàng lại",
		},
		{
			status: 5,
			name: "Giao thành công",
		},
	];

	return (
		<div className="w-full h-full flex relative overflow-hidden">
			<Link to={"/shipper"}>
				<div className="fixed top-4 left-4 size-10 rounded-full bg-blue-500 z-50 flex items-center justify-center cursor-pointer">
					<AiFillHome size={20} className="text-white" />
				</div>
			</Link>

			<div className={cn("w-full lg:w-4/5 h-full relative overflow-hidden")}>
				<MapComponent
					height="100vh"
					longitude={locationCurrent.longitude}
					latitude={locationCurrent.latitude}
				>
                    <SourcePage coord={directions?.coords} />

					<Marker
						longitude={locationCurrent.longitude}
						latitude={locationCurrent.latitude}
						anchor="bottom"
					>
						<FaMapMarkerAlt size={20} className="text-red-500" />
					</Marker>
					{location && (
						<Marker
							longitude={location[0]}
							latitude={location[1]}
							anchor="bottom"
						>
							<FaMapMarkerAlt size={20} className="text-blue-500" />
						</Marker>
					)}
				</MapComponent>
			</div>
			<div className={cn("hidden lg:flex w-1/5 h-screen bg-blue-200 p-4 space-y-2  flex-col")}>
				{/* user */}
				<div className="w-full p-2 bg-white rounded-md flex">
					<div className="size-10 rounded-full bg-white border overflow-hidden">
						<img
							src={data?.data?.user?.avatar || "/avatar_25.jpg"}
							alt=""
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1 pl-2">
						<p className="text-sm leading-5 font-medium">
							{data?.data?.address?.username}
						</p>
						<p className="text-base leading-5 font-medium">
							{data?.data?.address?.phone}
						</p>
					</div>
				</div>

				<div className="w-full p-2 bg-white rounded-md ">
					<p className="text-sm">
						Mã đơn hàng: <span className="font-medium">{data?.data?.code}</span>
					</p>
					<p className="text-sm">
						Tổng giá trị đơn hàng:{" "}
						<span className="font-medium text-red-500">
							{formatQuantity(data?.data?.totalMoney, "đ")}
						</span>
					</p>
					<p className="text-sm">
						Tiền khách trả khi nhận :{" "}
						<span className="font-medium text-red-500">
							{formatQuantity(data?.data?.amountToPay, "đ")}
						</span>
					</p>
					<p className="text-sm">
						Giá ship :{" "}
						<span className="font-medium text-red-500">
							{formatQuantity(data?.data?.shippingCost, "đ")}
						</span>
					</p>
					<p className="text-sm">
						Địa chỉ:{" "}
						<span className="font-medium">{data?.data?.address.address}</span>
					</p>
					<p className="text-sm">
						Trạng thái đơn hàng :{" "}
						<span className="font-medium">
							{
								listStatus?.find((item) => item.status === data?.data.status)
									?.name
							}
						</span>
					</p>
					<p className="text-sm">
						Lời nhắn: <span>{data?.data.note}</span>
					</p>
				</div>

				<div className="w-full p-2 bg-white rounded-md flex-1 h-full flex flex-col overflow-hidden">
					<div className="pb-1 mb-1 border-b text-sm font-medium">
						Tổng số sản phẩm: {data?.data?.orderItems.length} sp
					</div>
					<ScrollArea className="w-full flex-1 ">
						{data?.data?.orderItems.map((itemOrder:any) => (
							<div className="flex py-1">
								<div className="size-12 mr-1">
									<img
										src={itemOrder?.product?.thumbnail}
										alt=""
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex flex-col justify-between flex-1">
									<p className="line-clamp-1 text-sm leading-3 font-medium">
										{itemOrder?.product?.name}
									</p>
									<p className="line-clamp-1 text-xs">
										Loại: {`${itemOrder?.color?.name}/${itemOrder?.size}`}
									</p>
									<p className="line-clamp-1 text-xs flex justify-between">
										<span>Số lượng: {itemOrder?.quantity}</span>
										<span className="text-red-500 font-medium">
											{formatQuantity(itemOrder?.totalMoney, "đ")}
										</span>
									</p>
								</div>
							</div>
						))}
					</ScrollArea>
				</div>

				<Button variant={"success"}>
					Giao hàng thành công
				</Button>
			</div>
		</div>
	);
};

export default ShipperTranSport;
