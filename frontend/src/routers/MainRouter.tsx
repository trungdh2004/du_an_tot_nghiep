import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import Home from "@/pages/clients/Home";
import NotFound from "@/pages/NotFound";
import UserIndex from "@/pages/UserIndex";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "*", element: <NotFound /> },
			{ path: "address", element: <Address /> },
			{ path: "table", element: <UserIndex /> },
		],
	},
];
export default MainRouter;
