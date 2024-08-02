import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import NotFound from "@/pages/NotFound";
import UserIndex from "@/pages/admin/users/UserIndex";
import TestComponent from "@/pages/clients/Test";
import BlogPage from "@/pages/clients/blogs/BLogPage";
import HomePage from "@/pages/clients/home/page";
import BlogDetail from "@/pages/clients/blogs/BlogDetail";

const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "address", element: <Address /> },
			{ path: "blogs", element: <BlogPage /> },
			{ path: "blogDetail/:id", element: <BlogDetail /> },
			{ path: "table", element: <UserIndex /> },
			{ path: "testComponent", element: <TestComponent /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];
export default MainRouter;
