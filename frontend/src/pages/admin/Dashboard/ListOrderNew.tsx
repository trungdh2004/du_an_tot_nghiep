import { formatCurrency } from "@/common/func";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getNewOrder } from "@/service/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { format } from "date-fns";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { optimizeCloudinaryUrl } from "@/common/localFunction";

const statusOrder = [
	{
		status: 1,
		name: "Chờ xác nhận",
		fill: "#ff8359",
		color: "#fff",
	},
	{
		status: 2,
		name: "Đã xác nhận",
		fill: "#597aff",
		color: "#fff",
	},
	{
		status: 3,
		name: "Đang giao",
		fill: "#42e695",
		color: "#fff",
	},
	{
		status: 4,
		name: "Đã giao",
		fill: "#26e3e1",
	},
	{
		status: 5,
		name: "Đã nhận hàng",
		fill: "#90e326",
	},
	{
		status: 6,
		name: "Đã hủy",
		fill: "#ff7676",
		color: "white",
	},
];

const ListOrderNew = () => {
	const { data } = useQuery({
		queryKey: ["dashboardOrder"],
		queryFn: async () => {
			try {
				const { data } = await getNewOrder();

				return data;
			} catch (error) {}
		},
	});

	// const table = useReactTable({
	// 	data: data,
	// 	columns,
	// });

	return (
		<div className="w-full flex flex-col p-2 h-auto overflow-visible">
			<div className="flex items-center justify-between py-2 border-b">
				<p className="font-semibold">Thông tin đơn hàng gần đây</p>
				<div className="flex items-center gap-2"></div>
			</div>

			<div className="flex-1">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]"></TableHead>
							<TableHead className="w-[100px]">Mã</TableHead>
							<TableHead className="w-[100px]">Người đặt</TableHead>
							<TableHead>Tổng tiền</TableHead>
							<TableHead>Đã thanh toán</TableHead>
							<TableHead>Thanh toán</TableHead>
							<TableHead>Số sản phẩm</TableHead>
							<TableHead>Ngày đặt</TableHead>
							<TableHead className="min-w-[120px]">Trạng thái</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data &&
							data?.length > 0 &&
							data?.map((row: any) => (
								<TableRow key={row._id}>
									<TableCell className="text-center">
										<TooltipComponent label="Xem chi tiết">
											<Link to={`/admin/order/${row._id}`}>
												<MdOutlineRemoveRedEye size={20} className="text-blue-500"/>
											</Link>
										</TooltipComponent>
									</TableCell>
									<TableCell className="font-medium">{row.code}</TableCell>
									<TableCell>
										<TooltipComponent label={row?.user?.full_name}>
											<Avatar>
												<AvatarImage
													src={row?.user?.avatar ? optimizeCloudinaryUrl(row?.user?.avatar,40,40) : "/avatar_25.jpg"}
												/>
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
										</TooltipComponent>
									</TableCell>
									<TableCell className="text-rose-500 font-semibold">
										{formatCurrency(row.totalMoney)}
									</TableCell>
									<TableCell className="text-rose-500 font-semibold">
										{formatCurrency(row.amountToPay)}
									</TableCell>
									<TableCell className="font-semibold text-nowrap">
										{row?.paymentMethod === 1 ? "Tiền mặt" : "VNPAY"}
									</TableCell>
									<TableCell>{row.orderItems?.length} sp</TableCell>
									<TableCell>{format(row.orderDate, "dd/MM/yyy")}</TableCell>
									<TableHead>
										<div
											className="w-full h-5 rounded-full bg-red-500 text-center text-white leading-5 text-xs text-nowrap"
											style={{
												backgroundColor:
													statusOrder?.find(
														(item) => item.status === row.status,
													)?.fill || "black",
											}}
										>
											<span
												style={{
													color:
														statusOrder?.find(
															(item) => item.status === row.status,
														)?.color || "white",
												}}
											>
												{
													statusOrder?.find(
														(item) => item.status === row.status,
													)?.name
												}
											</span>
										</div>
									</TableHead>
								</TableRow>
							))}
						{!data ||
							(data.length === 0 && <TableCell>Không có giá trị</TableCell>)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ListOrderNew;
