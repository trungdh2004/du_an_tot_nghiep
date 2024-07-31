import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import NotFound from "@/pages/NotFound";
import UserIndex from "@/pages/admin/users/UserIndex";
import TestComponent from "@/pages/clients/Test";
import HomePage from "@/pages/clients/home/page";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "address", element: <Address /> },
			{ path: "table", element: <UserIndex /> },
			{ path: "testComponent", element: <TestComponent /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];
export default MainRouter;
