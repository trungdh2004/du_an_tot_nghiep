import Footer from "@/components/client/Footer";
import FooterV2 from "@/components/client/FooterV2";
import HeaderOrder from "@/pages/clients/order/HeaderOrder";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const OrderLayout = () => {
	return (
		<>
			<HeaderOrder />
			<Outlet />
			<div className="lg:block md:block hidden">
				<FooterV2 />
			</div>
			<ScrollRestoration />
		</>
	);
};

export default OrderLayout;
