import ShipperLayout from "@/layout/ShipperLayout";
import ShipperAuth from "@/pages/shipper/ShipperAuth";
import ShipperIndex from "@/pages/shipper/ShipperIndex";

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
	}

];
export default ShipperRouter;
