import AdminLayout from "@/layout/AdminLayout";
import BlogDetail from "@/pages/admin/Blogs/BlogDetail";
import BlogList from "@/pages/admin/Blogs/BlogList";
import EditBlog from "@/pages/admin/Blogs/EditBlog";
import NewBlog from "@/pages/admin/Blogs/NewBlog";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import ColorList from "@/pages/admin/color/ColorList";
import Dashboard from "@/pages/admin/Dashboard/Dashboard";

import UserDetail from "@/pages/admin/users/UserDetail";
import UserIndex from "@/pages/admin/users/UserIndex";
import SizeIndex from "@/pages/admin/size/SizeIndex";
import ProductIndex from "@/pages/admin/product/ProductIndex";
import ProductUpdate from "@/pages/admin/product/ProductUpdate";
import MyBlogs from "@/pages/admin/Blogs/MyBlog";
import TagIndex from "@/pages/admin/tags/TagIndex";
import PrivateRouter from "./PrivateRouter";
import ProductAddPage from "@/pages/admin/product/ProductAdd";
import OrderNeedConfirm from "@/pages/admin/order/OrderNeedConfirm";
import OrderById from "@/pages/admin/order/OrderById";
import OrderConfirm from "@/pages/admin/order/OrderConfirm";
import OrderShip from "@/pages/admin/order/OrderShip";
import OrderShipSuccess from "@/pages/admin/order/OrderShipSuccess";
import OrderReceived from "@/pages/admin/order/OrderReceived";
import OrderCancel from "@/pages/admin/order/OrderCancel";
import path from "path";
import OrderConfirmShipper from "@/pages/admin/order/OrderConfirmShipper";

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
				element: <BlogList />,
			},
			{
				path: "product/update/:id",
				element: <ProductUpdate />,
			},
			{
				path: "product",
				element: <ProductIndex />,
			},
			{
				path: "product/add",
				element: <ProductAddPage />,
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
				element: <ColorList />,
			},
			{
				path: "blogs",
				element: <BlogList />,
			},
			{
				path: "blogs/:id/",
				element: <BlogDetail />,
			},

			//order
			{
				path: "order",
				element: <OrderNeedConfirm />,
			},
			{
				path: "order/orderconfirm",
				element: <OrderConfirm />,
			},
			{
				path: "order/ordership",
				element: <OrderShip />,
			},
			{
				path: "order/ordershipsuccess",
				element: <OrderShipSuccess />,
			},
			{
				path: "order/orderreceived",
				element: <OrderReceived />,
			},
			{
				path: "order/ordercancel",
				element: <OrderCancel />,
			},
			{
				path: "order/:id",
				element: <OrderById />,
			},
			{
				path: "order/orderconfirmShipper",
				element: <OrderConfirmShipper />,
			},
		],
	},
];
export default AdminRouter;
