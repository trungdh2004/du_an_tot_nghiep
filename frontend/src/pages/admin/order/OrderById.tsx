import { getOrderById } from "@/service/order";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailTime from "./OrderDetailTime";
import OrderInformation from "./OrderInformation";
import OrderTracking from "./OrderTracking";

const OrderById = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [dataTrackings, setDataTracking] = useState([]);
	useEffect(() => {
		handleGetOrderById();
	}, [id]);
	const handleGetOrderById = async () => {
		try {
			const data = await getOrderById(id as string);
			setDataTracking(data.data.listStatusOrderDate);
			setData(data.data.data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="grid grid-cols-1 gap-4">
			<OrderTracking data={dataTrackings} />
			<OrderInformation data={data} getOrderById={handleGetOrderById} />
			<OrderDetailTime data={dataTrackings} />
		</div>
	);
};

export default OrderById;
