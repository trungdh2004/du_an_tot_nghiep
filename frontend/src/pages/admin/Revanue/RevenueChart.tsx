import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevenueChartFilter from "./RevenueChartFilter";
import StatisticsCard from "./StatisticsCard";
const RevenueChart = () => {
	return (
		<Card className="w-full bg-transparent border-none rounded-none shadow-none">
			<CardHeader>
				<CardTitle>Biểu Đồ Doanh Thu</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-5">
					<div className="col-span-3 bg-white xl:col-span-1 box-shadow rounded-xl">
						<StatisticsCard />
					</div>
					<RevenueChartFilter
						className="col-span-3 bg-white xl:col-span-2 box-shadow rounded-xl"
						title="Biểu đồ doanh thu theo tháng hiện tại"
					/>
				</div>
				<RevenueChartFilter
					isShowFilter
					title="Biểu đồ danh thu lọc theo tháng năm"
					className="mt-5 bg-white box-shadow rounded-xl"
				/>
			</CardContent>
		</Card>
	);
};

export default RevenueChart;
