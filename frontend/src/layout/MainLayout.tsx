import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<Header />
			<main className="mt-[64px]">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
