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
import VoucherForm from "@/pages/admin/Vouchers/VoucherForm";
import VoucherList from "@/pages/admin/Vouchers/VoucherList";
import LocationIndex from "@/pages/admin/Location/LocationIndex";
import ShipperIndex from "@/pages/shipper/ShipperIndex";
import ShipperDetail from "@/pages/admin/Shipper/ShipperDetail";

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
			//Quản lý người dùng
			{
				path: "users",
				element: <UserIndex />,
			},
			{
				path: "users/detail",
				element: <UserDetail />,
			},
			{
				path: "shipper",
				element: <ShipperIndex />,
			},
			{
				path: "shipper/detail",
				element: <ShipperDetail />,
			},
			// Quản lý sản phẩm
			{
				path: "product/update/:id",
				element: <ProductUpdate />,
			},
			{
				path: "product",
				element: <ProductIndex />,
			},
			{
				path: "product/category",
				element: <CategoryIndex />,
			},
			{
				path: "product/voucher",
				element: <VoucherList />,
			},
			{
				path: "product/voucher/add",
				element: <VoucherForm />,
			},
			{
				path: "product/voucher",
				element: <VoucherList />,
			},
			{
				path: "product/voucher/add",
				element: <VoucherForm />,
			},
			{
				path: "product/voucher/:id/edit",
				element: <VoucherForm />,
			},
			{
				path: "product/voucher/:id/edit",
				element: <VoucherForm />,
			},
			{
				path: "product/add",
				element: <ProductAddPage />,
			},
			// Quản lý biến thể
			{
				path: "variant/size",
				element: <SizeIndex />,
			},
			
			{
				path: "variant/color",
				element: <ColorList />,
			},
			// Quản lý blogs
			{
				path: "blogs",
				element: <BlogList />,
			},
			{
				path: "blogs/tags",
				element: <TagIndex />,
			},
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

			// location
			{
				path: "location",
				element: <LocationIndex />,
			},
		],
	},
];
export default AdminRouter;
