
import OrderLayout from "@/layout/OrderLayout";
import OrderPage from "@/pages/clients/order/OrderPage";

const OrderRouter = [
	{
		path: "/order",
		element: <OrderLayout />,
		children: [
			{
				path: "",
				element: <OrderPage />,
			},
		],
	},
];
export default OrderRouter;
