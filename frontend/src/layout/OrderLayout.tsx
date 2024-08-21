import Footer from "@/components/client/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const OrderLayout = () => {
	return (
		<>
			<Outlet />
			<div className="lg:block md:block hidden">
				<Footer />
			</div>
		</>
	);
};

export default OrderLayout;
