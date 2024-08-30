import { formatCurrency } from "@/common/func";
import TableComponent from "@/components/common/TableComponent";
import { Input } from "@/components/ui/input";
import { pagingOrder, pagingOrderAdmin } from "@/service/order";
import { SearchObjectOrder } from "@/types/searchObjectOrder";
import { typeResponse } from "@/types/typeReponse";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const OrderShipSuccess = () => {
	interface IOrder {
		_id: string;
		code: string;
		createdAt: string;
		totalMoney: number;
	}

	const [orderNeed, setOrderNeed] = useState<any>({});
	const [searchObjecOrder, setSearchObjecOrder] = useState<SearchObjectOrder>({
		status: 4,
		pageIndex: 1,
		pageSize: 10,
		sort: -1,
		method: null,
		startDate: null,
		endDate: null,
		paymentStatus: null,
		is_shipper: true,
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
			console.log(data.data);
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
			accessorKey: "code",
			header: "Mã đơn hàng",
		},
		{
			accessorKey: "totalMoney",
			header: "Tổng tiền",
			cell: ({ row }) => {
				return <div>{formatCurrency(row.original.totalMoney)}</div>;
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
		{
			id: "actions",
			enableHiding: false,
			header: "Chi tiết đơn hàng",
			cell: ({ row }) => {
				console.log(row.original._id);

				return (
					<div>
						<Link to={`/admin/order/${row.original._id}`}>
							<IoEyeSharp className="text-blue-400 cursor-pointer" size={25} />
						</Link>
					</div>
				);
			},
		},
	];
	return (
		<div>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-3">
					<h4 className="font-medium text-xl">Danh sách đơn hàng xác nhận</h4>
					<div className="flex justify-between">
						<Input
							placeholder="Tìm kiếm đơn hàng"
							className="w-[40%] md:text-base text-xs"
							// onChange={(e) => debounced(e.target.value)}
						/>
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

export default OrderShipSuccess;
