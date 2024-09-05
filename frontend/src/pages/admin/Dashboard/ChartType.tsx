"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { getChartUserDashboard } from "@/service/dashboard.service";
import { toast } from "sonner";

export const description = "A donut chart with text";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
	credential: {
		label: "Đăng kí",
        color:"blue"
	},
	google: {
		label: "Google",
		color: "green",
	}
} satisfies ChartConfig;

export function ComponentChartType() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

    const {data,isLoading} = useQuery({
        queryKey:["chartUser"],
        queryFn:async () => {
            try {
                const {data} = await getChartUserDashboard()
                return data
            } catch (error) {
                toast.error("Lấy thông tin thất bại")
            }
        }
    })
    const totalUser = React.useMemo(() => {
		return data?.reduce((acc:number, curr:any) => acc + curr.count, 0) || 0;
	}, [data]);

	return (
		<div className="h-[240px] md:h-[300px] lg:h-[400px] flex flex-col p-2">
            <div className="flex items-center justify-between py-2 border-b">
                <p className="font-semibold">Biểu đồ phương thức đăng kí</p>
                <div className="flex items-center gap-2">
                    
                </div>
            </div>
			<ChartContainer
				config={chartConfig}
				className="flex-1 w-full py-1"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={data}
						dataKey="count"
						nameKey="method"
						innerRadius={40}
						strokeWidth={10}
                        fill="green"
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {

									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-3xl font-bold"
											>
												{totalUser}
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
            <div className="flex items-center justify-around py-2">
                <div className="flex items-center gap-2">
                    <p className="size-3 bg-blue-500 rounded-sm"></p>
                    <p>Đăng kí</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="size-3 bg-orange-500 rounded-sm"></p>
                    <p>Google</p>
                </div>
            </div>
		</div>
	);
}
