import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/common/func";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { getCountRevenue } from "@/service/revenue";
import { FcMoneyTransfer, FcShipped } from "react-icons/fc";

interface StatisticsData {
	totalMoney: number;
	count: number;
}

const StatisticsCard = () => {
	const [data, setData] = useState<StatisticsData>({
		totalMoney: 0,
		count: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const { data } = await getCountRevenue();
			setData(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{[1, 2].map((item) => (
					<Card key={item} className="w-full h-40 animate-pulse">
						<CardContent className="p-6">
							<div className="w-1/3 h-4 mb-4 bg-gray-200 rounded"></div>
							<div className="w-2/3 h-8 bg-gray-200 rounded"></div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			<Card className="relative w-full overflow-hidden group">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
								Tổng doanh thu <FcMoneyTransfer />
							</p>
							<h3 className="mt-2 font-sans text-lg font-bold text-red-500">
								{formatCurrency(data.totalMoney)}
							</h3>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 w-full h-1 transition-colors duration-200 bg-primary/10 group-hover:bg-blue-500"></div>
				</CardContent>
			</Card>

			<Card className="relative w-full overflow-hidden group">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Số đơn hàng
							</p>
							<h3 className="mt-2 text-lg font-bold">
								{data.count.toLocaleString()}
							</h3>
						</div>
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
							<FcShipped className="text-lg" />
						</div>
					</div>
					<div className="absolute bottom-0 left-0 w-full h-1 transition-colors duration-200 bg-primary/10 group-hover:bg-blue-500"></div>
				</CardContent>
			</Card>

			<Card className="w-full col-span-1 md:col-span-2">
				<CardContent className="p-6">
					<div className="flex flex-col items-center gap-4 md:flex-row">
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium text-muted-foreground">
								Giá trị trung bình mỗi đơn
							</p>
							<p className="text-2xl font-bold text-red-500">
								{formatCurrency(data.totalMoney / data.count)}
							</p>
						</div>
						<div className="w-32 h-32">
							<div className="relative w-full h-full border-8 rounded-full border-primary/10">
								<div
									className="absolute inset-0 border-8 border-blue-500 rounded-full"
									style={{
										clipPath: `inset(0 ${100 - (data.count / 100) * 100}% 0 0)`,
									}}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<p className="text-lg font-bold">{data.count}%</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatisticsCard;
