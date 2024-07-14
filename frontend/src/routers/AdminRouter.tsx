import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import SizeIndex from "@/pages/admin/size/SizeIndex";
import TagIndex from "@/pages/admin/tags/TagIndex";
import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";

const AdminRouter = [
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				path: "",
				element: <Dashboard />,
			},
			{
				path: "add",
				element: <Dashboard />,
			},
			{
				path: "users",
				element: <UserIndex />,
			},
			{
				path: "users/detail",
				element: <UserDetail />,
			},
			{
				path: "category",
				element: <CategoryIndex />,
			},
			{
				path: "tags",
				element: <TagIndex />,
			},
			{
				path: "size",
				element: <SizeIndex />,
			},
		],
	},
];
export default AdminRouter;
