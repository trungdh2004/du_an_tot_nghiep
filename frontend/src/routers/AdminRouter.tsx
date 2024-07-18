import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import PrivateRouter from "./PrivateRouter";
import path from "path";
import NewBlog from "@/pages/admin/Blogs/NewBlog";
import EditBlog from "@/pages/admin/Blogs/EditBlog";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import SizeIndex from "@/pages/admin/size/SizeIndex";
import TagIndex from "@/pages/admin/tags/TagIndex";
import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";
import ProductIndex from "@/pages/admin/product/ProductIndex";
import ProductAddandUpdate from "@/pages/admin/product/ProductAddandUpdate";


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
				path: "product",
				element: <ProductIndex />,
      },
      {
        path: "product/add",
        element: <ProductAddandUpdate />,
      },
			{
				path: "tags",
				element: <TagIndex />,
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
			{
				path: "size",
				element: <SizeIndex />,
			},
		],
	},
];
export default AdminRouter;
