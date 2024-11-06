import TableComponent from "@/components/common/TableComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Decentralization, pagingStaff } from "@/service/user-admin";
import { SearchObjectType } from "@/types/searchObjecTypes";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
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
const StaffIndex = () => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 5,
		keyword: "",
	});
	const [data, setData] = useState<IData[]>([]);
	const [response, setResponse] = useState({
		pageIndex: 1,
		pageSize: 5,
		pageCount: 0,
		totalElement: 0,
		totalOptionPage: 0,
	});
	useEffect(() => {
		handlePagingUser();
	}, [searchObject]);
	const debounced = useDebounceCallback((inputValue: string) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
			keyword: inputValue,
		}));
	}, 300);
	const handlePagingUser = async () => {
		try {
			const { data } = await pagingStaff(searchObject);
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
	const handleUpdate = async (id: string) => {
		try {
			const { data } = await Decentralization(id as string, 1);
			toast.success("Cập nhật thành công");
			handlePagingUser();
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangePageSize = (value: number) => {
		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
			pageIndex: 1,
		}));
	};
	const handleChangePage = (value: any) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: value.selected + 1,
		}));
		setRowSelection({});
	};
	const columns: ColumnDef<IData>[] = [
		{
			accessorKey: "full_name",
			header: () => {
				return <div className="md:text-base text-xs">Tên</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="md:text-base text-xs">{row?.original?.full_name}</div>
				);
			},
		},
		{
			accessorKey: "email",
			header: () => {
				return <div className="md:text-base text-xs">Email</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="md:text-base text-xs">{row?.original?.email}</div>
				);
			},
		},
		{
			accessorKey: "avatarUrl",
			header: () => {
				return <div className="md:text-base text-xs">Ảnh</div>;
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
				return <div className="md:text-base text-xs">Phương thức</div>;
			},
			cell: ({ row }) => {
				const value = `${row.getValue("provider") === "google.com" ? "Google" : "Đăng ký"}`;
				return <div className="font-medium md:text-base text-xs">{value}</div>;
			},
		},
		{
			accessorKey: "createdAt",
			header: () => {
				return <div className="md:text-base text-xs">Ngày tạo</div>;
			},
			cell: ({ row }) => {
				const parsedDate = parseISO(row.original.createdAt);
				const formattedDate = format(parsedDate, "dd/MM/yyyy");
				return <div className="md:text-base text-xs">{formattedDate}</div>;
			},
		},
		{
			id: "status",
			header: () => {
				return <div className="md:text-base text-xs">Trạng thái</div>;
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
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<div>
						{!row?.original?.is_admin && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<span className="sr-only">Open menu</span>
										<HiOutlineDotsVertical className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{!row?.original?.is_admin && (
										<DropdownMenuItem
											onClick={() => handleUpdate(row?.original?._id)}
											className="cursor-pointer"
										>
											Chuyển sang khách
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				);
			},
		},
	];
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<h4 className="font-medium md:text-xl text-base">
					Danh sách người dùng
				</h4>
				<div className="flex justify-between">
					<Input
						placeholder="Tìm kiếm người dùng"
						className="w-[40%] md:text-base text-xs"
						onChange={(event) => debounced(event.target.value)}
					/>
				</div>
			</div>
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

export default StaffIndex;
