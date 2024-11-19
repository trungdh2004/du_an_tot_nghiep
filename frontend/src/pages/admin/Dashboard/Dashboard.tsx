import BlogNewPublic from "./BlogNewPublic";
import CategoryDashboard from "./Category.dashboard";
import { ComponentChart } from "./Chart";
import { ComponentChartType } from "./ChartType";
import CountTotal from "./CountTotal";
import ListOrderNew from "./ListOrderNew";
import OrderToDayDashBoard from "./OrderToDay.dashboard";
import ProductDashboard from "./Product.dashboad";

const Dashboard = () => {
	return (
		<div>
			<div className="w-full min-h-screen grid grid-cols-12 gap-2 md:gap-4 lg:gap-6">
				<CountTotal />
				<div className="col-span-12 md:col-span-4 rounded-xl">
					<OrderToDayDashBoard />
				</div>
				<div className="col-span-12 md:col-span-8 bg-white box-shadow rounded-xl">
					<ComponentChart />
				</div>

				<div className="col-span-12 bg-white box-shadow rounded-xl">
					<ListOrderNew />
				</div>

				<div className="col-span-12 md:col-span-8 bg-white box-shadow rounded-xl">
					<ProductDashboard />
				</div>
				<div className="col-span-12 md:col-span-4 bg-white box-shadow  rounded-xl">
					{/* <OrderToDayDashBoard /> */}
					<ComponentChartType />

				</div>
				<div className="col-span-12 md:col-span-4 bg-white box-shadow rounded-xl">
					<CategoryDashboard />
				</div>
				<div className="col-span-12 md:col-span-8 ">
					<BlogNewPublic />
				</div>
			</div>
		</div>
	);
};
// bg-gradient-to-r from-[rgba(191,230,255,0.48)] to-[rgba(115,186,251,0.48)]
export default Dashboard;
