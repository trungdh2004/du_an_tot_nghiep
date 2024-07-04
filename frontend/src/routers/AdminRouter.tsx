import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import BlogList from "@/pages/admin/blog/BlogList";
import ColorForm from "@/pages/admin/color/ColorForm";
import ColorList from "@/pages/admin/color/ColorList";
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
				path: "blog",
				element: <BlogList />
			},
			{
				path: "color",
				element: <ColorList />
			},
			{
				path: "color/add",
				element: <ColorForm />
			},
			{
				path: "color/:id",
				element: <ColorForm />
			}

		],
	},
];
export default AdminRouter;
