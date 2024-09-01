"use client";

import { TrendingUp } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getCountCategory } from "@/service/dashboard.service";

export const description = "A bar chart with a custom label";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#008cff",
	},
	totalMoney: {
		label: "Doanh thu",
	},
	label: {
		color: "hsl(var(--background))",
	},
} satisfies ChartConfig;

export default function CategoryDashboard() {
	const { data, isLoading } = useQuery({
		queryKey: ["dashboardCategory"],
		queryFn: async () => {
			try {
				const { data } = await getCountCategory();
				return data;
			} catch (error) {}
		},
	});

	return (
		<div className="h-[240px] md:h-[300px] lg:h-[400px] flex flex-col p-2">
			<div className="flex items-center justify-between py-2 border-b">
				<p className="font-semibold">Biểu đồ đơn hàng 123</p>
			</div>

			{!isLoading && (
				<ChartContainer config={chartConfig} className="flex-1 w-full py-1">
					<BarChart
						accessibilityLayer
						data={data}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="categoryName"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							hide
						/>
						<XAxis dataKey="totalMoney" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="totalMoney"
							layout="horizontal"
							fill="var(--color-desktop)"
							radius={4}
						>
							<LabelList
								dataKey="categoryName"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
							/>
							<LabelList
								dataKey="totalMoney"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			)}
		</div>
	);
}
