import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import Home from "@/pages/clients/Home";
import NotFound from "@/pages/NotFound";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "*", element: <NotFound /> },
			{ path: "address", element: <Address /> },
		],
	},
];
export default MainRouter;
