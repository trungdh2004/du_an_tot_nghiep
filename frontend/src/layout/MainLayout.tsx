import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<div className="bg-magic"></div>
			<Header />
			<main className="mt-[64px]">
				<Outlet />
			</main>
			<Footer />
			<ScrollRestoration />
		</div>
	);
};

export default MainLayout;
