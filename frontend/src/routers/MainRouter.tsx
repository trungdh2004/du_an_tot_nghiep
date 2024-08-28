import MainLayout from "@/layout/MainLayout";
import UserIndex from "@/pages/admin/users/UserIndex";
import Address from "@/pages/clients/address/Address";
import NotFound from "@/pages/NotFound";
// import TestComponent from "@/pages/clients/Test";
import BlogDetail from "@/pages/clients/blogs/BlogDetail";
import BlogPage from "@/pages/clients/blogs/BLogPage";
import DetailProduct from "@/pages/clients/detail-home/page";
import HomePage from "@/pages/clients/home/page";
import ShopProduct from "@/pages/clients/shop/ShopProduct";
// import OrderProcessing from "@/pages/clients/OrderProcessing";
import AccountLayout from "@/layout/AccountLayout";
import CartIndex from "@/pages/clients/cart/CartIndex";
import OrderManagements from "@/pages/clients/account/Purchase";
import OrderDetail from "@/pages/clients/account/PurchaseOrder";

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
      { path: "cart", element: <CartIndex /> },
      { path: "shop", element: <ShopProduct /> },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          {
            path: '/account/purchase',
            element: <OrderManagements />
          },
          {
            path: '/account/purchase/order',
            element: <OrderDetail />
          },
        ]
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  // { path: "orderProcessing", element: <OrderProcessing /> },
  { path: "*", element: <NotFound /> },
];
export default MainRouter;
