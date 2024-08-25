import MapComponent from "@/components/map/Map";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useSearchParams } from "react-router-dom";
import { getListOrderMap } from "@/service/shipper";
import { cn } from "@/lib/utils";
import { IOrderShipper } from "@/types/shipper.interface";
import MarketItem from "@/components/shipper/shipperMap/MarketItem";
import useStoreShipper from "@/store/useCurrentShipper";

const ShipperIndex = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const status = (searchParams.get("status") !== "3" || searchParams.get("status") !== "3") ? "2" : searchParams.get("status")  || "2"
	const {current} = useStoreShipper()
	
	const { data } = useQuery<IOrderShipper[]>({
		queryKey: ["listOrder", "shipper",status],
		queryFn: async () => {
			try {
				const { data } = await getListOrderMap(status);
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

	

	return (
		<div className="w-full h-full relative">
			<div className="fixed top-4 right-0 space-y-2 z-10">
				<div className={cn("px-2 text-sm md:text-base md:px-4 py-1  rounded-s-sm bg-slate-100 text-blue-500 shadow border font-medium cursor-pointer",status === "2" && "bg-blue-500 text-white border-blue-500")} onClick={() => {
					setSearchParams({
						status: "2",
					})
				}}>Chưa giao</div>
				<div className={cn("px-2 text-sm md:text-base md:px-4 py-1 bg-slate-100 rounded-s-sm text-green-500 shadow border cursor-pointer",status === "3" && "bg-green-500 text-white border-green-500")} onClick={() => {
					setSearchParams({
						status: "3",
					})
				}}>Đang giao</div>
			</div>
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
					{/* <FaMapMarkerAlt size={20} className="text-red-500" /> */}
					<div className="relative flex items-center justify-center">
						<div className="relative size-10 rounded-full flex justify-center items-center bg-red-500 z-10">
							<img
								src={current?.avatar || "/avatar_25.jpg"}
								alt=""
								className="size-8 rounded-full object-cover"
							/>
						</div>
						<div className="absolute size-4 -bottom-1 bg-red-500 rotate-45 z-0"></div>
					</div>
				</Marker>
				{data &&
					data?.map((item: IOrderShipper) => {
						const location = item?.address?.location?.coordinates;
						return (
							<MarketItem order={item} location={location} status={status}/>
						);
					})}
			</MapComponent>
		</div>
	);
};

export default ShipperIndex;
