import Footer from "@/components/client/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			{/* header */}

			<main>
				<Outlet />
			</main>
			
			{/* footer */}
			<Footer />
		</div>
	);
};

export default MainLayout;
