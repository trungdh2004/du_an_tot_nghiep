import AccountLayout from "@/layout/AcountLayout";
import MainLayout from "@/layout/MainLayout";
import UserIndex from "@/pages/admin/users/UserIndex";
import AccountIndex from "@/pages/clients/account/AccountIndex";
import ChangePassword from "@/pages/clients/account/ChangePassword";
import PaymentIndex from "@/pages/clients/account/PaymentIndex";
import OrderManagements from "@/pages/clients/account/Purchase";
import PurchaseOrder from "@/pages/clients/account/PurchaseOrder";
import Address from "@/pages/clients/address/Address";
import BlogDetail from "@/pages/clients/blogs/BlogDetail";
import BlogPage from "@/pages/clients/blogs/BLogPage";
import CartPage from "@/pages/clients/cart/CartPage";
import DetailProduct from "@/pages/clients/detail-home/page";
import HomePage from "@/pages/clients/home/page";
import OrderProcessing from "@/pages/clients/order/OrderProcessing";
import WrapperSearch from "@/pages/clients/search/WrapperSearch";
import ShopProduct from "@/pages/clients/shop/ShopProduct";
import NotFound from "@/pages/NotFound";
import { Navigate } from "react-router-dom";
const MainRouter = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "/shop/detail/:slug", element: <DetailProduct /> },
			{ path: "address", element: <Address /> },
			{ path: "blogs", element: <BlogPage /> },
			{ path: "blogDetail/:id", element: <BlogDetail /> },
			{ path: "table", element: <UserIndex /> },
			{ path: "cart", element: <CartPage /> },
			{ path: "shop", element: <ShopProduct /> },
			{
				path: "search",
				element: <WrapperSearch />,
			},
			{
				path: "/account",
				element: <AccountLayout />,
				children: [
					{
						path: "",
						element: <Navigate to={"/account/profile"} />,
					},
					{
						path: "profile",
						element: <AccountIndex />,
					},
					{
						path: "purchase",
						element: <OrderManagements />,
					},
					{
						path: "purchase/order/:id",
						element: <PurchaseOrder />,
					},
					{
						path: "payment",
						element: <PaymentIndex />,
					},
					{
						path: "password",
						element: <ChangePassword />,
					},
				],
			},
		],
	},
	// { path: "orderProcessing", element: <OrderProcessing /> },
	{ path: "*", element: <NotFound /> },
	{ path: "/orderprocessing", element: <OrderProcessing /> },
];
export default MainRouter;
