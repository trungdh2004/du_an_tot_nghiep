import React, { useEffect, useState } from "react";
import AddressOrder from "./AddressOrder";
import ProductOrder from "./ProductOrder";
import Vorcher from "./Vorcher";
import Footer from "@/components/client/Footer";
import PaymentMethod from "./PaymentMethod";
import NoteOrder from "./NoteOrder";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrderPayUponReceipt, pagingOrder } from "@/service/order";
import { ObjectCheckoutOrder } from "@/types/ObjectCheckoutOrder";
import { toast } from "sonner";

const OrderPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const paramsObject = Object.fromEntries(searchParams.entries());
	const stateOrder = JSON.parse(paramsObject.state);
	const [orderParams, setOrderParams] = useState<any | {}>(stateOrder || {});
	const [order, setOrder] = useState<any>({});
	const { mutate } = useMutation({
		mutationKey: ["orderPagingCart"],
		mutationFn: async (valueOrder) => {
			try {
				const { data } = await pagingOrder(valueOrder);
				return data;
			} catch (error) {
				console.error("Error creating order:", error);
				throw error;
			}
		},
		onSuccess: (data) => {
			setOrder(data);
		},
		onError: (error) => {
			console.error("Error in creating order:", error);
		},
	});
	useEffect(() => {
		mutate(orderParams);
	}, []);

	const handleChangeAddress = (id: string) => {
		if (id) {
			setOrderParams({ ...orderParams, addressId: id });
			mutate({ ...orderParams, addressId: id });
		}
	};

	const [orderCheckout, setOrderCheckout] = useState<ObjectCheckoutOrder>(
		() => {
			return {
				listId: orderParams.listId,
				address: order?.address,
				voucher: "",
				paymentMethod: 1,
				note: "",
				shippingCost: 10000,
				distance: "",
			};
		},
	);
	useEffect(() => {
		if (order?.address) {
			setOrderCheckout((prev) => ({
				...prev,
				address: order.address,
			}));
		}
	}, [order]);
	console.log("orderCheckout", orderCheckout);
const navigate = useNavigate()
	const handleCheckout = () => {
		if (orderCheckout.paymentMethod === 1) {
			try {
				(async () => {
					const { data } = await createOrderPayUponReceipt(orderCheckout);
          toast.success("Thanh toán thành công");
          navigate('/order/success')
					return data;
				})();
			} catch (error) {
				console.log("Error:", error);
				toast.error("Thanh toán thất bại");
			}
		}
	};

	return (
		<>
			<div className="bg-white w-full lg:h-[100px] h-[70px] flex items-center border border-gray-200">
				<div className="flex items-center gap-4 lg:px-[130px] md:px-[65px] px-0">
					<h1 className="text-2xl">Logo</h1>
					<span className="lg:text-xl text-sm">|</span>
					<span className="lg:text-2xl text-sm">Thanh toán</span>
				</div>
			</div>
			<div className="bg-main w-full h-full">
				<div className="lg:px-[130px] md:px-[65px] px-0">
					<AddressOrder
						data={order}
						handleChangeAddress={handleChangeAddress}
					/>
					<ProductOrder data={order} />
					<Vorcher />
					<NoteOrder setOrderCheckout={setOrderCheckout} />
					<PaymentMethod
						data={order}
						handleCheckout={handleCheckout}
						setOrderCheckout={setOrderCheckout}
					/>
				</div>
			</div>
		</>
	);
};

export default OrderPage;
