import OrderLayout from "@/layout/OrderLayout";
import OrderPage from "@/pages/clients/order/OrderPage";
import OrderSuccess from "@/pages/clients/order/OrderSuccess";
import PrivateRouter from "./PrivateRouter";
import ProtectedRouter from "./ProtectedRouter";
import OrderPageV2 from "@/pages/clients/order/orderV2/OrderPageV2";

const OrderRouter = [
	{
		path: "/order",
		element: (
			<ProtectedRouter>
				<OrderLayout />
			</ProtectedRouter>
		),
		children: [
			{
				path: "",
				element: <OrderPage />,
			},
			{
				path: "success",
				element: <OrderSuccess />,
			},
			{
				path: "v2",
				element: <OrderPageV2 />,
			},
		],
	},
];
export default OrderRouter;
