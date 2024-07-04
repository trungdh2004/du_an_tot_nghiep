import React, { useEffect, useState, useTransition } from "react";

import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TableComponent from "@/components/common/TableComponent";
import instance from "@/config/instance";
import { Link } from "react-router-dom";
import { useDebounceCallback } from "usehooks-ts";
import { parseISO, format } from "date-fns";
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
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import DialogConfirm from "@/components/common/DialogConfirm";
import { toast } from "sonner";
import { banUser, unBanUser } from "@/service/user-admin";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchObjectType } from "@/types/searchObjecTypes";
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

const UserIndex = () => {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
	const [listRowSeleted, setListRowSelected] = useState<IData[]>([]);
	const [openBanId, setopenBanId] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [openUnbanId, setopenUnbanId] = useState<string | null>(null);
	const debounced = useDebounceCallback((inputValue: string) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
			keyword: inputValue,
		}));
	}, 300);

	const [response, setResponse] = useState({
		pageIndex: 1,
		pageSize: 5,
		pageCount: 0,
		totalElement: 0,
		totalOptionPage: 0,
	});
	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 5,
		keyword: "",
		sort: 1,
		fieldSort: "",
		tab: 1,
		provider: "",
	});
	const [data, setData] = useState<IData[]>([]);
	useEffect(() => {
		handlePagingUser();
	}, [searchObject]);

	const handlePagingUser = async () => {
		try {
			const { data } = await instance.post("/admin/list-user", searchObject);
			console.log(data);

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

	const handleBlock = async (id: string) => {
		try {
			const { data } = await banUser(id);
			setopenBanId(null);
			handlePagingUser();
			toast.success("Đã cấm người dùng thành công");
		} catch (error) {
			toast.error("Cấm người dùng thất bại");
		}
	};

	const handleUnBlock = async (id: string) => {
		try {
			const { data } = await unBanUser(id);
			setopenUnbanId(null);
			handlePagingUser();
			toast.success("Bỏ cấm người dùng thành công");
		} catch (error) {
			toast.error("Bỏ Cấm người dùng thất bại");
		}
	};
	const handleChangePageSize = (value: number) => {
		console.log(value);

		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
		}));
	};
	const columns: ColumnDef<IData>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => {
						table.toggleAllPageRowsSelected(!!value);
						if (value) setListRowSelected(data);
						if (!value) setListRowSelected([]);
					}}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => {
						row.toggleSelected(!!value);
						if (value) setListRowSelected((prev) => [...prev, row.original]);
						if (!value)
							setListRowSelected((prev) => {
								return prev.filter((item) => item._id !== row.original._id);
							});
					}}
					aria-label="Select row"
				/>
			),
			size: 100,
    },
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
				console.log(row);

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
				return (
					<div className="font-medium md:text-base text-xs">
						{formattedDate}
					</div>
				);
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
						className={`font-medium ${row.original.blocked_at ? "bg-[#cf4040]" : "bg-green-500"} text-center items-center md:text-base text-xs`}
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<HiOutlineDotsVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />

							<DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
							{row?.original?.blocked_at ? (
								<DropdownMenuItem
									className="text-green-400"
									onClick={() => setopenUnbanId(row?.original?._id)}
								>
									Mở
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									className="text-red-400"
									onClick={() => setopenBanId(row?.original?._id)}
								>
									Cấm
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const handleChangePage = (value: any) => {
		console.log("value change page", value);

		setSearchObject((prev) => ({
			...prev,
			pageIndex: value.selected + 1,
		}));
	};

	const handleSubmit = () => {
		console.log("rowSelection:", listRowSeleted);
	};

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
					<div className="flex gap-3 justify-center items-center">
						<div className="pr-5">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="cursor-pointer">
										<IoFilter size={20} />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-[150px]">
									<DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup
										className="cursor-pointer"
										value={`${searchObject.fieldSort}`}
										onValueChange={(e) => {
											setSearchObject((prev) => ({
												...prev,
												pageIndex: 1,
												fieldSort: e,
											}));
										}}
									>
										<DropdownMenuRadioItem
											value="email"
											className="cursor-pointer"
										>
											Email
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="full_name"
											className="cursor-pointer"
										>
											Tên
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="createdAt"
											className="cursor-pointer"
										>
											Ngày tạo
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
									<DropdownMenuSeparator />
									<DropdownMenuLabel>Sắp xếp theo chiều</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={`${searchObject.sort}`}
										onValueChange={(e) => {
											const sortNumber = parseInt(e) as 1 | -1;
											console.log(sortNumber);

											setSearchObject((prev) => ({
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
									<DropdownMenuLabel>Sắp xếp theo Login</DropdownMenuLabel>
									<DropdownMenuRadioGroup
										value={searchObject.provider}
										onValueChange={(e) => {
											setSearchObject((prev) => ({
												...prev,
												pageIndex: 1,
												provider: e,
											}));
										}}
									>
										<DropdownMenuRadioItem
											value="google.com"
											className="cursor-pointer"
										>
											Google
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem
											value="credential"
											className="cursor-pointer"
										>
											Create
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() =>
											setSearchObject({
												pageIndex: 1,
												pageSize: 5,
												keyword: "",
												sort: 1,
												fieldSort: "",
												tab: 1,
												provider: "",
											})
										}
										className="cursor-pointer hover:bg-[#ee6e6e]"
									>
										Reset
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
			<Tabs value={`${searchObject.tab}`} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="1"
						onClick={() => setSearchObject((prev) => ({ ...prev, tab: 1 }))}
						className="md:text-base text-sm"
					>
						Người dùng
					</TabsTrigger>
					<TabsTrigger
						value="2"
						onClick={() => setSearchObject((prev) => ({ ...prev, tab: 2 }))}
						className="md:text-base text-sm"
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
				dataPageSize={[1, 2, 3, 5]}
			/>
			{!!openBanId && (
				<DialogConfirm
					open={!!openBanId}
					handleClose={() => setopenBanId(null)}
					content="Cấm người dùng"
					handleSubmit={() => handleBlock(openBanId)}
					labelConfirm="Cấm"
				/>
			)}
			{!!openUnbanId && (
				<DialogConfirm
					open={!!openUnbanId}
					handleClose={() => setopenUnbanId(null)}
					content="Bỏ cấm người dùng"
					handleSubmit={() => handleUnBlock(openUnbanId)}
					labelConfirm="Bỏ cấm"
				/>
			)}
		</div>
	);
};

export default UserIndex;
