import ShipperLayout from "@/layout/ShipperLayout";
import ShipperAuth from "@/pages/shipper/ShipperAuth";
import ShipperIndex from "@/pages/shipper/ShipperIndex";
import ShipperTranSport from "@/pages/shipper/ShipperTranSport";

const ShipperRouter = [
	{
		path: "/shipper",
		element: <ShipperLayout />,
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
		path:"/shipper/transport/:code",
		element:<ShipperTranSport />
	}

];
export default ShipperRouter;
