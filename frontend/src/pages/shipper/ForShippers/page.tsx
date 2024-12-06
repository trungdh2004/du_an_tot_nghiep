import { useEffect, useState } from "react";
import { OrderCard } from "./OrderCard";
import { getListOrderIsShipper } from "@/service/shipper";
import { AxiosError } from "axios";
import { toast } from "sonner";

const ForShippersPage = () => {
  const [resultOrder, setResultOrder] = useState({
		content: [],
		pageIndex: 1,
		totalPage: 1,
	});
	useEffect(() => {
    handleGetListOrderIsShipper(1,12)
  }, []);
	const handleGetListOrderIsShipper = async (
		pageIndex: number,
		pageSize: number,
	) => {
		try {
			const { data } = await getListOrderIsShipper({ pageIndex, pageSize });
			setResultOrder(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		}
	};
	return (
		<div className="p-6 mx-auto ">
			<h2 className="mb-4 text-xl font-semibold leading-8 sm:text-2xl">
				Đơn hàng
			</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{resultOrder?.content.map((order:any,index:number) => (
					<OrderCard key={order.id} index={index} {...order} />
				))}
			</div>
		</div>
	);
};

export default ForShippersPage;
