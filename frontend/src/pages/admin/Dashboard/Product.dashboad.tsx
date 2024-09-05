"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { useQuery } from "@tanstack/react-query";
import { getCountProduct } from "@/service/dashboard.service";
import { optimizeCloudinaryUrl } from "@/common/localFunction";

export const description = "A multiple bar chart";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	totalQuantity: {
		label: "Số lượng",
		color: "#ff6a00",
	},
	totalMoney: {
		label: "Doanh thu",
		color: "#008cff",
	},
	label: {},
} satisfies ChartConfig;

export default function ProductDashboard() {
	const { data } = useQuery({
		queryKey: ["dashboardProduct"],
		queryFn: async () => {
			try {
				const { data } = await getCountProduct();
				return data;
			} catch (error) {}
		},
	});

	return (
		<div className="h-[240px] md:h-[300px] lg:h-[400px] flex flex-col p-2">
			<div className="flex items-center justify-between py-2 border-b">
				<p className="font-semibold">Biểu đồ đơn hàng</p>
			</div>

			<ChartContainer config={chartConfig} className="flex-1 w-full py-1">
				<BarChart accessibilityLayer data={data}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="_id"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tick={({ x, y, payload, value }) => {
							const image = data[payload.index].productImage;
							return (
								<foreignObject x={x - 15} y={y - 10} width={30} height={30}>
									<img
										src={image}
										width={30} // Đặt chiều rộng của hình ảnh
										height={30} // Đặt chiều cao của hình ảnh
										className="size-[30px] border rounded-sm"
									/>
								</foreignObject>
							);
						}}
						// tick={<CustomXAxisLabel />}
					/>
					<YAxis
						dataKey="totalQuantity"
						yAxisId={0}
						tickLine={false}
						label={{
							value: "Số lượng",
							angle: -90,
							position: "insideLeft",
						}}
					/>
					<YAxis
						dataKey="totalMoney"
						orientation="right"
						yAxisId={1}
						label={{
							value: "Doanh thu",
							angle: 90,
							position: "insideRight",
						}}
					/>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								indicator="dashed"
								labelFormatter={(value,payload) => {
									return (
										payload[0] ? <img src={optimizeCloudinaryUrl(payload[0]?.payload?.productImage,20,20)} className="size-5"/> :null
									)
								}}
							></ChartTooltipContent>
						}
					/>
					<Bar
						dataKey="totalQuantity"
						fill="var(--color-totalQuantity)"
						radius={4}
						yAxisId={0}
					/>
					<Bar
						dataKey="totalMoney"
						fill="var(--color-totalMoney)"
						radius={4}
						yAxisId={1}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
