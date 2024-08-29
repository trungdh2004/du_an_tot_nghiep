import { getOrderById } from "@/service/order";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTracking from "./OrderTracking";
import OrderInformation from "./OrderInformation";

const OrderById = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	console.log(id);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getOrderById(id as string);
				console.log(data);
				setData(data.data);
				return data;
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<div className="grid grid-cols-1 gap-4">
			<OrderTracking data={data} />
			<OrderInformation data={data} />
		</div>
	);
};

export default OrderById;
