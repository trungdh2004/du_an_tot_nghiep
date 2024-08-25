import { returnUrlVnPay } from "@/service/order";
import { error } from "console";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const OrderProcessing = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const paramsObject = Object.fromEntries(searchParams.entries());
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await returnUrlVnPay(searchParams.toString());
				console.log("data", data);

				if (data?.data?.type === 3) {
					navigate("/order/success");
					return data;
				}
			} catch (error: any) {
				if (error?.response.data?.type === 1) {
					return navigate("/");
				}

				if (error?.response.data?.type === 2) {
					return navigate(`/order/${error?.response.data?.url}`);
				}
			}
		};

		fetchData();
	}, [paramsObject]);
	return (
		<div className="flex flex-col justify-center items-center gap-5 py-[280px]">
			<FaSpinner size={80} className="animate-spin text-blue-400" />
			<p className="font-semibold">
				Đơn hàng của bạn đang được xử lý . Vui lòng chờ trong giây lát
			</p>
		</div>
	);
};

export default OrderProcessing;