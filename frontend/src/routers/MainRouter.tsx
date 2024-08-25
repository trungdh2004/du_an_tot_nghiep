import MainLayout from "@/layout/MainLayout";
import Address from "@/pages/clients/address/Address";
import NotFound from "@/pages/NotFound";
import UserIndex from "@/pages/admin/users/UserIndex";
// import TestComponent from "@/pages/clients/Test";
import BlogPage from "@/pages/clients/blogs/BLogPage";
import HomePage from "@/pages/clients/home/page";
import BlogDetail from "@/pages/clients/blogs/BlogDetail";
import DetailProduct from "@/pages/clients/detail-home/page";
import path from "path";
import ShopProduct from "@/pages/clients/shop/ShopProduct";
// import OrderProcessing from "@/pages/clients/OrderProcessing";
import CartIndex from "@/pages/clients/cart/CartIndex";
import Index from "@/pages/clients/orderManagements/Index";
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
      { path: "purchase", element: <Index /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // { path: "orderProcessing", element: <OrderProcessing /> },
  { path: "*", element: <NotFound /> },
];
export default MainRouter;
