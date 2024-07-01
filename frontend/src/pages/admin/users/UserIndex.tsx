import React, { useEffect, useState, useTransition } from "react";

import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TableComponent from "@/components/common/TableComponent";
import instance from "@/config/instance";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import DialogConfirm from "@/components/common/DialogConfirm";
import { toast } from "sonner";
import { banUser } from "@/service/user-admin";
import { Input } from "@/components/ui/input";
import { IoFilter } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
	const [tabBan, setTabban] = useState<number>(1);
	console.log(tabBan);
	const [response, setResponse] = useState({
		pageIndex: 1,
		pageSize: 5,
		pageCount: 0,
		totalElement: 0,
		totalOptionPage: 0,
	});
	const [searchObject, setSearchObject] = useState({
		pageIndex: 1,
		pageSize: 5,
		keyword: "",
		sort: 1,
		sortField: "",
		tab: 1,
	});
	const [data, setData] = useState<IData[]>([]);
	useEffect(() => {
		handlePagingUser()
  }, [searchObject]);
  

  const handlePagingUser = async () => {
    try {
      const { data } = await instance.post("/admin/list-user", searchObject);
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
  }

  const handleChangePageSize = (value: number) => {
    console.log(value);
    
		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
		}));
	};

	const handleBlock = () => {
		startTransition(() => {
			(async () => {
				try {
					const { data } = await banUser(openBanId as string);
					setopenBanId(null);
					setData((prev) =>
						prev.map((item) =>
							item._id === data.data._id ? { ...item, blocked_at: true } : item,
						),
					);
          toast.success("Bạn đã chặn người dùng này");
          handlePagingUser()
				} catch (error) {
					toast.error("Chặn người dùng thất bại");
				}
			})();
		});
  };

  const handleUnBlock = () => {

    
  }
  

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
				return <div className="text-red-500">Name</div>;
			},
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "avatarUrl",
			header: "AvatarUrl",
			cell: ({ row }) => {
				return (
					<img
						src={row.original.avatarUrl || "/avatar_25.jpg"}
						className="w-[40px] h-[40px] rounded-full"
					/>
				);
			},
		},
		{
			accessorKey: "provider",
			header: ({}) => {
				return <div>Phương thức</div>;
			},
			cell: ({ row }) => {
				const value = `${row.getValue("provider") ? "google" : "Create"}`;
				return <div className="font-medium">{value}</div>;
			},
		},
		{
			accessorKey: "createdAt",
			header: "Ngày tạo",
			cell: ({ row }) => {
				const parsedDate = parseISO(row.original.createdAt);
				const formattedDate = format(parsedDate, "dd/MM/yyyy");
				return <div className="font-medium">{formattedDate}</div>;
			},
		},
		{
			id: "status",
			header: () => {
				return <div>Trạng thái</div>;
			},
			cell: ({ row }) => {
				const status = row.original.blocked_at ? "Bị cấm" : "Hoạt động";
				return (
					<Badge
						className={`font-medium ${row.original.blocked_at ? "bg-[#cf4040]" : "bg-green-500"} text-center items-center`}
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
								<DropdownMenuItem className="text-green-400">
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
				<h4 className="font-medium text-xl">Danh sách người dùng</h4>
				<div className="flex justify-between">
					<Input placeholder="Tìm kiếm người dùng" className="w-[40%]" />
					<div className="pr-5">
						<IoFilter size={20} />
					</div>
				</div>
			</div>
			<Tabs value={`${searchObject.tab}`} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="1"
						onClick={() => setSearchObject((prev) => ({ ...prev, tab: 1 }))}
					>
						User
					</TabsTrigger>
					<TabsTrigger
						value="2"
						onClick={() => setSearchObject((prev) => ({ ...prev, tab: 2 }))}
					>
						UserBan
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
					content={"Bạn có chắc chắn muốn cấm người dùng này không?"}
					handleSubmit={() => handleBlock()}
					title="Cấm người dùng"
				/>
			)}
		</div>
	);
};

export default UserIndex;
