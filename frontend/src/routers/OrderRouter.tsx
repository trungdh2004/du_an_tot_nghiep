import OrderLayout from "@/layout/OrderLayout";
import OrderPage from "@/pages/clients/order/OrderPage";
import OrderSuccess from "@/pages/clients/order/OrderSuccess";

const OrderRouter = [
	{
		path: "/order",
		element: <OrderLayout />,
		children: [
			{
				path: "",
				element: <OrderPage />,
			},
			{
				path: "success",
				element: <OrderSuccess />,
			},
		],
	},
];
export default OrderRouter;
