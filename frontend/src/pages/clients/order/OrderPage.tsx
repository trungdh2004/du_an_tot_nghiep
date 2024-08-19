import React from "react";
import AddressOrder from "./AddressOrder";
import ProductOrder from "./ProductOrder";
import Vorcher from "./Vorcher";
import Footer from "@/components/client/Footer";
import PaymentMethod from "./PaymentMethod";

const OrderPage = () => {
	return (
		<>
			<div className="bg-white w-full h-[100px] flex items-center border border-gray-200">
				<div className="flex items-center gap-4 px-[130px]">
					<h1 className="text-2xl">Logo</h1>
					<span className="text-xl">|</span>
					<span className="text-2xl">Thanh toán</span>
				</div>
			</div>
			<div className="bg-main w-full h-full">
				<div className="px-[130px]">
					<AddressOrder />
					<ProductOrder />
					<Vorcher />
					<PaymentMethod />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default OrderPage;
