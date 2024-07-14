import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import BlogDetail from "@/pages/admin/blog/BlogDetail";
import BlogList from "@/pages/admin/blog/BlogList";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";
import path from "path";

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
				path: "blog",
				element: <BlogList />
			},
			{
				path: "blog/detail",
				element: <BlogDetail />
			}
		],
	},
];
export default AdminRouter;
