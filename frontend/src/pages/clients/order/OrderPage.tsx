import React from "react";
import AddressOrder from "./AddressOrder";
import ProductOrder from "./ProductOrder";
import Vorcher from "./Vorcher";
import Footer from "@/components/client/Footer";
import PaymentMethod from "./PaymentMethod";
import NoteOrder from "./NoteOrder";

const OrderPage = () => {
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
					<AddressOrder />
					<ProductOrder />
          <Vorcher />
          <NoteOrder/>
					<PaymentMethod />
				</div>
			</div>
			
		</>
	);
};

export default OrderPage;
