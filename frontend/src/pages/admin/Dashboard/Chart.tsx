"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getChartOrderDashboard } from "@/service/dashboard.service";
import { toast } from "sonner";

export const description = "A stacked area chart";



const chartConfig = {
	success: {
		label: "Thành công",
		color: "rgba(136, 255, 132, 0.92)",
	},
	new: {
		label: "Đơn mới",
		color: "rgba(115 , 185, 251, 0.84)",
	},
	cancel: {
		label: "Đơn mới",
		color: "red",
	},
} satisfies ChartConfig;

export function ComponentChart() {
    const [status,setStatus] = useState(1)
    const {data,isLoading} = useQuery({
        queryKey:["chartOrder",status],
        queryFn:async () => {
            try {
                const {data} = await getChartOrderDashboard(status)
                return data
            } catch (error) {
                toast.error("Lấy thông tin thất bại")
            }
        }
    })


    

	return (
		<div className="h-[240px] md:h-[300px] lg:h-[400px] flex flex-col p-2">
			<div className="flex items-center justify-between py-2 border-b">
                <p className="font-semibold">Biểu đồ đơn hàng</p>
                <div className="flex items-center gap-2">
                    <button className={cn(
                        "py-1 px-2 rounded-sm  font-medium border text-sm hover:bg-blue-500 hover:text-white",
                        status === 1 && "bg-blue-500 text-white"
                    )} onClick={() => {
                        setStatus(1)
                    }}>Ngày</button>
                    <button  className={cn(
                        "py-1 px-2 rounded-sm  font-medium border text-sm hover:bg-blue-500 hover:text-white",
                        status === 2 && "bg-blue-500 text-white"
                    )} onClick={() => {
                        setStatus(2)
                    }}>Tháng</button>
                </div>
            </div>
			<ChartContainer config={chartConfig} className="flex-1 w-full py-1">
				<AreaChart
					// accessibilityLayer
					data={data?.listDataOrder || []}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="date"
						tickLine={true}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent indicator="dot" />}
					/>
					<Area
						type="monotone"
						dataKey="success"
						fill="var(--color-success)"
						fillOpacity={0.4}
						stroke="green"
					/>
					<Area
						dataKey="new"
						type="monotone"
						fill="var(--color-new)"
						fillOpacity={0.4}
						stroke="blue"
					/>
					<Area
						dataKey="cancel"
						type="monotone"
						fill="var(--color-cancel)"
						fillOpacity={0.4}
						stroke="red"
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
