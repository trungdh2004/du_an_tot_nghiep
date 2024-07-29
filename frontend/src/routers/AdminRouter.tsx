import AdminLayout from "@/layout/AdminLayout";
import BlogDetail from "@/pages/admin/Blogs/BlogDetail";
import BlogList from "@/pages/admin/Blogs/BlogList";
import EditBlog from "@/pages/admin/Blogs/EditBlog";
import NewBlog from "@/pages/admin/Blogs/NewBlog";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import ColorList from "@/pages/admin/color/ColorList";
import Dashboard from "@/pages/admin/Dashboard";

import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";
import SizeIndex from "@/pages/admin/size/SizeIndex";
import ProductIndex from "@/pages/admin/product/ProductIndex";
import ProductAddandUpdate from "@/pages/admin/product/ProductAdd";
import ProductUpdate from "@/pages/admin/product/ProductUpdate";
import PrivateRouter from "./PrivateRouter";
import TagIndex from "@/pages/admin/tags/TagIndex";
import MyBlogs from "@/pages/admin/Blogs/MyBlog";

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
				path: "blogs",
				element: <BlogList />
			},
			{
				path: "product/update/:id",
				element: <ProductUpdate />,
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
			{
				path: "blogs/my-blogs",
				element: <MyBlogs />,
			},
			{
				path: "color",
				element: <ColorList />
			},

		],
	},
];
export default AdminRouter;