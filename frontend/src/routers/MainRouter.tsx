import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import Home from "@/pages/clients/Home";
import NotFound from "@/pages/NotFound";
import UserIndex from "@/pages/admin/users/UserIndex";
import TestComponent from "@/pages/clients/Test";
import path from "path";
import ShopProduct from "@/components/client/shop/ShopProduct";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "address", element: <Address /> },
			{ path: "shop", element: <ShopProduct /> },
			{ path: "table", element: <UserIndex /> },
			{ path: "testComponent", element: <TestComponent /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];
export default MainRouter;
