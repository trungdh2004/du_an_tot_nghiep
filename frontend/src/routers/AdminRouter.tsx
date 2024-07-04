import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import BlogList from "@/pages/admin/blog/BlogList";

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
				path: "blog",
				element: <BlogList />
			}

		],
	},
];
export default AdminRouter;
