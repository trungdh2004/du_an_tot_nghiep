import TableComponent from "@/components/common/TableComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { paddingCate } from "@/service/category-admin";
import { SearchObjectType } from "@/types/searchObjecTypes";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { IoFilter } from "react-icons/io5";
import instance from "@/config/instance";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { typeResponse } from "@/types/typeReponse";
import SizeAddandUpdate from "./SizeAddandUpdate";

const SizeIndex = () => {
	interface IData {
		_id: string;
		name: string;
		code: string;
		createdAt: string;
		updatedAt: string;
	}
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
	const [listRowSeleted, setListRowSelected] = useState<IData[]>([]);
	const [data, setData] = useState<IData[]>([]);
	const [openId, setOpenId] = useState<string | boolean>(false);
	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 5,
		keyword: "",
	});
	console.log(searchObject);
	const [response, setResponse] = useState<typeResponse>({
		pageCount: 0,
		totalElement: 0, //tổng số phần tử
		totalOptionPage: 0, //tổng số phần tử trong 1 trang
	});

	useEffect(() => {
		handleSize();
	}, [searchObject]);

	const handleSize = async () => {
		try {
			const { data } = await instance.post(`/size/paddingSize`, searchObject);
			console.log(data);
			setData(data.content);
			setResponse({
				pageCount: data.totalPage,
				totalElement: data.totalAllOptions,
				totalOptionPage: data.totalOptionPage,
			});
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};
	const handleChangePageSize = (value: number) => {
		console.log(value);

		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
		}));
	};
	const handleChangePage = (value: any) => {
		console.log("value change page", value);

		setSearchObject((prev) => ({
			...prev,
			pageIndex: value.selected + 1,
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
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "code",
			header: "Code",
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
							<DropdownMenuSeparator />
							<Button
								onClick={() => setOpenId(row?.original?._id)}
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full"
							>
								Sửa size
							</Button>
							<Button
								onClick={() => setOpenId(row?.original?._id)}
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full"
							>
								Xóa size
							</Button>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<h4 className="font-medium text-xl">Danh sách Size</h4>
				<div className="flex justify-between">
					<Input placeholder="Tìm kiếm người dùng" className="w-[40%]" />
					<div className="flex items-center gap-4 pr-5">
						<Button
							onClick={() => setOpenId(true)}
							className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full border"
						>
							Thêm size
						</Button>

						<IoFilter size={20} />
					</div>
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
				pageIndex={searchObject.pageIndex}
				pageSize={searchObject.pageSize}
				pageCount={response.pageCount}
				totalElement={response.totalElement}
				handleChangePageSize={handleChangePageSize}
				dataPageSize={[1, 3, 5, 10]}
			/>
			{!!openId && (
				<SizeAddandUpdate
					open={openId}
					title="Cập nhật"
					handleClose={() => setOpenId(false)}
					handlePaging={() => handleSize()}
				/>
			)}
		</div>
	);
};

export default SizeIndex;
