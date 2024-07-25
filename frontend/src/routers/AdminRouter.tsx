import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import PrivateRouter from "./PrivateRouter";
import path from "path";
import NewBlog from "@/pages/admin/Blogs/NewBlog";
import EditBlog from "@/pages/admin/Blogs/EditBlog";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import TagIndex from "@/pages/admin/tags/TagIndex";
import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";
import SizeIndex from "@/pages/admin/size/SizeIndex";

const AdminRouter = [
	{
		path: "/admin",
		element: (
			<PrivateRouter>
				<AdminLayout />
			</PrivateRouter>
		),
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
			// Blogs
			{
				path: "blogs/new-blog",
				element: <NewBlog />,
			},
			{
				path: "blogs/:id/edit",
				element: <EditBlog />,
			},
		],
	},
];
export default AdminRouter;
