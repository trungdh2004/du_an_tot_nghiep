import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";

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
		],
	},
];
export default AdminRouter;
