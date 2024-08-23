import ShipperLayout from "@/layout/ShipperLayout";
import ShipperAuth from "@/pages/shipper/ShipperAuth";
import ShipperIndex from "@/pages/shipper/ShipperIndex";
import ShipperPending from "@/pages/shipper/ShipperPending";
import ShipperTranSport from "@/pages/shipper/ShipperTranSport";
import PrivateRouterShipper from "./PrivateRouterShipper";

const ShipperRouter = [
	{
		path: "/shipper",
		element: <PrivateRouterShipper><ShipperLayout /></PrivateRouterShipper>,
		children: [
			{
				path:"",
				element:<ShipperIndex />
			}
		],
	},
	{
		path:"/shipper/auth",
		element:<ShipperAuth />
	},
	{
		path:"/shipper/pending",
		element:<ShipperPending />
	},
	{
		path:"/shipper/transport/:code",
		element:<PrivateRouterShipper><ShipperTranSport /></PrivateRouterShipper>
	}

];
export default ShipperRouter;
