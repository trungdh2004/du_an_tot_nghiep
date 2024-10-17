import { useEffect, useState } from "react";

import TableComponent from "@/components/common/TableComponent";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pagingOrderShipper } from "@/service/shipper";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";
interface IData {
	_id: string;
	full_name: string;
	email: string;
	provider: string | null;
	avatarUrl: string;
	is_admin: boolean;
	blocked_at: boolean;
	createdAt: string;
}
interface ISearchObjectOderShipper {
    pageIndex: number,
    status: number
}
const ListOrder = () => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
	const [response, setResponse] = useState({
		pageIndex: 1,
		pageSize: 5,
		pageCount: 0,
		totalElement: 0,
		totalOptionPage: 0,
	});
	const [searchObject, setSearchObject] = useState<ISearchObjectOderShipper>({
		pageIndex: 1,
		status: 1
	});
	const [data, setData] = useState<IData[]>([]);
	useEffect(() => {
		// handlePagingOder();
	}, [searchObject]);

	const handlePagingOder = async () => {
		try {
			const { data } = await pagingOrderShipper(searchObject.pageIndex, searchObject.status);
			setData(data.content);
			setResponse({
				pageIndex: data.pageIndex,
				pageSize: data.pageSize,
				pageCount: data.totalPage,
				totalElement: data.totalAllOptions,
				totalOptionPage: data.totalOptionPage,
			});
		} catch (error) {
			toast.error("Không lấy được data người dùng");
		}
	};
	const handleChangePageSize = (value: number) => {
		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
			pageIndex: 1,
    })); 
  };
  
	const columns: ColumnDef<IData>[] = [
		{
			accessorKey: "full_name",
			header: () => {
				return <div className="text-xs md:text-base">Tên</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="text-xs md:text-base">{row?.original?.full_name}</div>
				);
			},
		},
		{
			accessorKey: "email",
			header: () => {
				return <div className="text-xs md:text-base">Email</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="text-xs md:text-base">{row?.original?.email}</div>
				);
			},
		},
		{
			accessorKey: "avatarUrl",
			header: () => {
				return <div className="text-xs md:text-base">Ảnh</div>;
			},
			cell: ({ row }) => {
				return (
					<img
						src={row.original.avatarUrl || "/avatar_25.jpg"}
						className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
					/>
				);
			},
		},
		{
			accessorKey: "provider",
			header: () => {
				return <div className="text-xs md:text-base">Phương thức</div>;
			},
			cell: ({ row }) => {
				const value = `${row.getValue("provider") === "google.com" ? "Google" : "Đăng ký"}`;
				return <div className="text-xs font-medium md:text-base">{value}</div>;
			},
		},
		{
			accessorKey: "createdAt",
			header: () => {
				return <div className="text-xs md:text-base">Ngày tạo</div>;
			},
			cell: ({ row }) => {
				const parsedDate = parseISO(row.original.createdAt);
				const formattedDate = format(parsedDate, "dd/MM/yyyy");
				return (
					<div className="text-xs md:text-base">
						{formattedDate}
					</div>
				);
			},
		},
		{
			id: "status",
			header: () => {
				return <div className="text-xs md:text-base">Trạng thái</div>;
			},
			cell: ({ row }) => {
				const status = row.original.blocked_at ? "Bị cấm" : "Hoạt động";
				return (
					<Badge
						className={`font-medium ${row.original.blocked_at ? "bg-[#cf4040]" : "bg-green-500"} text-center items-center text-xs text-nowrap leading-[14px]`}
					>
						{status}
					</Badge>
				);
			},
		},
	];

	const handleChangePage = (value: any) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: value.selected + 1,
    }));
    setRowSelection({});
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<h4 className="text-base font-medium md:text-xl">
					Danh sách người dùng
				</h4>
			</div>
			<Tabs value={`${searchObject.status}`} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="1"
						onClick={() => {
							setRowSelection({});
							setSearchObject((prev) => ({ ...prev, status: 1,pageIndex:1 }));
						}}
					>
						Người dùng
					</TabsTrigger>
					<TabsTrigger
						value="2"
						onClick={() => {
							setRowSelection({});
							setSearchObject((prev) => ({ ...prev, status: 2,pageIndex:1 }));
						}}
					>
						Người dùng bị cấm
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<TableComponent
				data={data}
				columns={columns}
				// selected
				rowSelection={rowSelection}
				setRowSelection={setRowSelection}
				// phân trang
				handleChangePage={handleChangePage}
				pageIndex={response.pageIndex}
				pageSize={response.pageSize}
				pageCount={response.pageCount}
				totalElement={response.totalElement}
				handleChangePageSize={handleChangePageSize}
			/>			
		</div>
	);
};

export default ListOrder;
