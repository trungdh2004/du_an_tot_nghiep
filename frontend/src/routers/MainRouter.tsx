import MainLayout from "@/layout/MainLayout";
import UserIndex from "@/pages/admin/users/UserIndex";
import Address from "@/pages/clients/address/Address";
import HomePage from "@/pages/clients/home/page";
import NotFound from "@/pages/NotFound";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "*", element: <NotFound /> },
			{ path: "address", element: <Address /> },
			{ path: "table", element: <UserIndex /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];
export default MainRouter;
