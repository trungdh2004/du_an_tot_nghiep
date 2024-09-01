import { formatCurrency } from "@/common/func";
import TableComponent from "@/components/common/TableComponent";
import { Input } from "@/components/ui/input";
import { pagingOrder, pagingOrderAdmin } from "@/service/order";
import { SearchObjectOrder } from "@/types/searchObjectOrder";
import { typeResponse } from "@/types/typeReponse";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { IoEyeSharp, IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const OrderNeedConfirm = () => {
	interface IOrder {
		_id: string;
		code: string;
		createdAt: string;
		totalMoney: number;
		user: {
			full_name: string;
		};
		paymentMethod: number;
		orderItems: any;
	}

	const [orderNeed, setOrderNeed] = useState<any>({});
	const [searchObjecOrder, setSearchObjecOrder] = useState<SearchObjectOrder>({
		status: 1,
		pageIndex: 1,
		pageSize: 5,
		sort: 1,
		method: null,
		startDate: null,
		endDate: null,
		paymentStatus: null,
		is_shipper: null,
	});
	useEffect(() => {
		handleOrderNeed();
	}, [searchObjecOrder]);
	const [response, setResponse] = useState<typeResponse>({
		pageCount: 0,
		totalElement: 0, //tổng số phần tử
		totalOptionPage: 0, //tổng số phần tử trong 1 trang
	});
	const handleOrderNeed = async () => {
		try {
			const { data } = await pagingOrderAdmin(searchObjecOrder);
			setOrderNeed(data.data.content);
			setResponse({
				pageCount: data.data.totalPage,
				totalElement: data.data.totalAllOptions,
				totalOptionPage: data.data.totalOptionPage,
			});
			return data.data;
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangePageSize = (value: number) => {
		setSearchObjecOrder((prev) => ({
			...prev,
			pageSize: value,
		}));
	};
	const handleChangePage = (value: any) => {
		console.log("value change page", value);
		setSearchObjecOrder((prev) => ({
			...prev,
			pageIndex: value.selected + 1,
		}));
	};
	const columns: ColumnDef<IOrder>[] = [
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<div>
						<Link to={`/admin/order/${row.original._id}`}>
							<IoEyeSharp className="text-blue-400 cursor-pointer" size={25} />
						</Link>
					</div>
				);
			},
		},

		{
			accessorKey: "code",
			header: "Mã đơn hàng",
			cell: ({ row }) => {
				return <div className="font-medium">{row?.original?.code}</div>;
			},
		},
		{
			accessorKey: "user",
			header: "Người đặt hàng",
			cell: ({ row }) => {
				return (
					<div className="font-medium">{row?.original?.user?.full_name}</div>
				);
			},
		},
		{
			accessorKey: "payment",
			header: "Thanh toán",
			cell: ({ row }) => {
				return (
					<div className="font-medium">
						{row?.original?.paymentMethod === 1
							? "Thanh toán khi nhận"
							: "Thanh toán Banking"}
					</div>
				);
			},
		},
		{
			accessorKey: "OrderItems",
			header: "Số sản phẩm",
			cell: ({ row }) => {
				return (
					<div className="font-medium text-center">
						{row.original.orderItems.length}
					</div>
				);
			},
		},
		{
			accessorKey: "totalMoney",
			header: "Tổng tiền",
			cell: ({ row }) => {
				return (
					<div className="font-medium text-red-500">
						{formatCurrency(row.original.totalMoney)}
					</div>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: "Ngày đặt hàng",
			cell: ({ row }) => {
				const parsedDate = parseISO(row.original.createdAt);
				const formattedDate = format(parsedDate, "dd/MM/yyyy");
				return <div className="font-medium">{formattedDate}</div>;
			},
		},
	];
	const [dateStart, setDateStart] = React.useState<Date | undefined>();
	const [dateEnd, setDateEnd] = React.useState<Date | undefined>();

	return (
		<div>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-3">
					<h4 className="font-medium text-xl">Danh sách đơn hàng</h4>
					<div className="flex justify-between">
						<div className="flex gap-3 items-center">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] justify-start text-left font-normal",
											!dateStart && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{dateStart ? (
											format(dateStart, "PPP")
										) : (
											<span>Ngày bắt đầu</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={dateStart}
										onSelect={setDateStart}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] justify-start text-left font-normal",
											!dateEnd && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{dateEnd ? (
											format(dateEnd, "PPP")
										) : (
											<span>Ngày kết thúc</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={dateEnd}
										onSelect={setDateEnd}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<Button
								onClick={() => {
									setSearchObjecOrder((prev) => ({
										...prev,
										pageIndex: 1,
										startDate: dateStart,
										endDate: dateEnd,
									}));
								}}
								className=""
							>
								Tìm kiếm
							</Button>
						</div>
						<div className="pr-5">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="cursor-pointer">
										<IoFilter size={20} />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-[150px]" align="end">
									<DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										value={`${searchObjecOrder.method}`}
										onValueChange={(e) => {
											const method = parseInt(e);
											setSearchObjecOrder((prev) => ({
												...prev,
												pageIndex: 1,
												method: method,
											}));
										}}
									>
										<DropdownMenuRadioItem value="1" className="cursor-pointer">
											Thanh toán khi nhận hàng
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="2" className="cursor-pointer">
											Thanh toán Internet banking
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
									<DropdownMenuSeparator />
									<DropdownMenuLabel>Sắp xếp theo chiều</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={`${searchObjecOrder.sort}`}
										onValueChange={(e) => {
											const sortNumber = parseInt(e) as 1 | -1;
											setSearchObjecOrder((prev) => ({
												...prev,
												pageIndex: 1,
												sort: sortNumber,
											}));
										}}
									>
										<DropdownMenuRadioItem value="1" className="cursor-pointer">
											Tăng dần
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="-1"
											className="cursor-pointer"
										>
											Giảm dần
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
									<DropdownMenuSeparator />
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => {
											setSearchObjecOrder({
												status: 1,
												pageIndex: 1,
												pageSize: 5,
												sort: 1,
												method: null,
												startDate: null,
												endDate: null,
												paymentStatus: null,
												is_shipper: null,
											});
											setDateEnd(undefined);
											setDateStart(undefined);
										}}
										className="cursor-pointer bg-[#f0f0f0] text-red-500 pl-8"
									>
										Mặc định
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
				<TableComponent
					data={orderNeed}
					columns={columns}
					// selected
					// rowSelection={rowSelection}
					// setRowSelection={setRowSelection}
					// phân trang
					handleChangePage={handleChangePage}
					pageIndex={searchObjecOrder.pageIndex as number}
					pageSize={searchObjecOrder.pageSize as number}
					pageCount={response.pageCount}
					totalElement={response.totalElement}
					handleChangePageSize={handleChangePageSize}
				/>
			</div>
		</div>
	);
};

export default OrderNeedConfirm;
