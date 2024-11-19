import React, { useEffect, useState } from "react";
import ProductOrderV2 from "./ProductOrderV2";
import InformationOrder from "./InformationOrder";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
	createOrderPayUponReceipt,
	createOrderVNPayPayment,
	pagingOrder,
} from "@/service/order";
import { ObjectCheckoutOrder } from "@/types/ObjectCheckoutOrder";
import { IOrderMoneyValue } from "@/types/order";
import { toast } from "sonner";
import AddressOrder from "../AddressOrder";
import Vorcher from "../Vorcher";
import NoteOrder from "../NoteOrder";
import PaymentMethod from "../PaymentMethod";

const OrderPageV2 = () => {
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
				addressId: order?.address?._id,
				voucher: null,
				paymentMethod: 1,
				note: "",
				shippingCost: order?.shippingCost,
			};
		},
	);
	const [moneyVoucher, setMoneyVoucher] = useState<IOrderMoneyValue | null>(
		null,
	);
	useEffect(() => {
		if (order?.address) {
			setOrderCheckout((prev) => ({
				...prev,
				addressId: order?.address?._id,
				shippingCost: order?.shippingCost,
			}));
		}
	}, [order]);

	const navigate = useNavigate();
	const handleCheckout = () => {
		if (order.data.length === 0) {
			toast.error("Vui lòng mua thêm hàng");
			return;
		}
		if (!orderCheckout.addressId) {
			toast.error("Vui lòng chọn địa chỉ giao hàng");
			return;
		}
		if (orderCheckout.paymentMethod === 1) {
			try {
				(async () => {
					const { data } = await createOrderPayUponReceipt(orderCheckout);
					toast.success("Thanh toán thành công");
					navigate("/order/success");
					return data;
				})();
			} catch (error) {
				console.log("Error:", error);
				toast.error("Thanh toán thất bại");
			}
		}

		if (orderCheckout.paymentMethod === 2) {
			try {
				(async () => {
					const { data } = await createOrderVNPayPayment({
						...orderCheckout,
						returnUrl: `${window.location.origin}/orderprocessing`,
					});
					window.location.href = data.paymentUrl;
					return data;
				})();
			} catch (error) {
				console.log("Error:", error);
			}
		}
	};

	return (
		<div className="grid grid-cols-12 gap-5 lg:px-[100px] md:px-[65px] px-0 py-8">
			<div className="col-span-12 lg:col-span-8 md:col-span-8">
				<AddressOrder data={order} handleChangeAddress={handleChangeAddress} />
				<ProductOrderV2 data={order} />
			</div>
			<div className="col-span-12 lg:col-span-4 md:col-span-4">
				<div className="w-full">
					<h4 className="font-bold text-xl pb-9">Thông tin liên quan</h4>

					<Vorcher
						data={order}
						setOrderCheckout={setOrderCheckout}
						setMoneyVoucher={setMoneyVoucher}
						stateOrder={stateOrder}
					/>
					<NoteOrder setOrderCheckout={setOrderCheckout} />
					<PaymentMethod
						data={order}
						handleCheckout={handleCheckout}
						setOrderCheckout={setOrderCheckout}
						orderCheckout={orderCheckout}
						moneyVoucher={moneyVoucher}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrderPageV2;
