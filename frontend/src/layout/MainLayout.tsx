import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import OverlayVioletV2 from "@/components/OverlayVioletV2";
import HeaderAndSlider from "@/pages/clients/home/HeaderAndSlider";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const MainLayout = () => {
	const location = useLocation();
	return (
		<div>
			{/* <div className="bg-magic"></div> */}
			<OverlayVioletV2 />
			{location.pathname == "/" ? <HeaderAndSlider /> : <Header />}
			<main className="mt-[64px]">
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	);
};

export default MainLayout;
