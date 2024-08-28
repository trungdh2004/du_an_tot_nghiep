import { getOrderById } from "@/service/order";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  console.log(data);
  
  return <div>
    
  </div>;
};

export default OrderById;
