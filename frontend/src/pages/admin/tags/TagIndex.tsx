import TableComponent from "@/components/common/TableComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { SearchObjectType } from "@/types/searchObjecTypes";
import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { IoFilter } from "react-icons/io5";
import instance from "@/config/instance";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { typeResponse } from "@/types/typeReponse";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import DialogConfirm from "@/components/common/DialogConfirm";
import TagAdd from "./TagAddandUpdate";
import { hiddentag, unhiddentag } from "@/service/tags-admin";

const TagIndex = () => {
	interface IData {
		_id: string;
		name: string;
		description: string;
		deleted: boolean;
		createdAt: string;
		updatedAt: string;
		slug: string;
	}
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
	const [listRowSeleted, setListRowSelected] = useState<IData[]>([]);
	const [data, setData] = useState<IData[]>([]);
	const [openId, setOpenId] = useState<string | boolean>(false);
	const [openUnhiddenTag, setopenUnhiddenTag] = useState<string | boolean>(
		false,
	);
	const [openHiddenTag, setOpenHiddenTag] = useState<string | boolean>(false);
	const debounced = useDebounceCallback((inputValue: string) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
			keyword: inputValue,
		}));
	}, 300);
	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 5,
		keyword: "",
		fieldSort: "",
		sort: 1,
		tab: 1,
	});
	const [response, setResponse] = useState<typeResponse>({
		pageCount: 0,
		totalElement: 0, //tổng số phần tử
		totalOptionPage: 0, //tổng số phần tử trong 1 trang
	});

	useEffect(() => {
		handleTags();
	}, [searchObject]);

	const handleTags = async () => {
		try {
			const { data } = await instance.post(`/tags/paging`, searchObject);
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
	const handleHiddenCate = async (id: string | boolean) => {
		try {
			const { data } = await hiddentag(id);
			setOpenHiddenTag(false);
			handleTags();
			toast.success("Đã ẩn thẻ tag thành công");
		} catch (error) {
			toast.error("Ẩn thẻ tag thất bại");
		}
	};

	const handleUnhiddenCate = async (id: string | boolean) => {
		try {
			const { data } = await unhiddentag(id);
			setopenUnhiddenTag(false);
			handleTags();
			toast.success("Bỏ ẩn thẻ tag thành công");
		} catch (error) {
			toast.error("Bỏ ẩn thẻ tag thất bại");
		}
	};
	const handleChangePageSize = (value: number) => {
		console.log(value);

		setSearchObject((prev) => ({
			...prev,
			pageSize: value,
			pageIndex: 1,
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
			header: () => {
				return <div className="md:text-base text-xs">Tên</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="md:text-base text-xs">{row?.original?.name}</div>
				);
			},
		},
		{
			accessorKey: "description",
			header: () => {
				return <div className="md:text-base text-xs">Mô tả</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="md:text-base text-xs">
						{row?.original?.description}
					</div>
				);
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
							<DropdownMenuItem
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full text-start cursor-pointer"
								onClick={() => setOpenId(row?.original?._id)}
							>
								Sửa thẻ tag
							</DropdownMenuItem>
							{row?.original?.deleted ? (
								<DropdownMenuItem
									className="text-green-400"
									onClick={() => setopenUnhiddenTag(row?.original?._id)}
								>
									Bỏ ẩn
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									className="text-red-400"
									onClick={() => setOpenHiddenTag(row?.original?._id)}
								>
									Ẩn
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<h4 className="font-medium md:text-xl text-base">Danh sách thẻ tag</h4>
				<div className="flex justify-between">
					<Input
						placeholder="Tìm kiếm thẻ tag"
						className="w-[40%] md:text-base text-xs"
						onChange={(event) => debounced(event.target.value)}
					/>
					<div className="flex items-center gap-4">
						<Button
							onClick={() => setOpenId(true)}
							className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full border"
						>
							Thêm thẻ tag
						</Button>
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
						Thẻ tag
					</TabsTrigger>
					<TabsTrigger
						value="2"
						onClick={() => setSearchObject((prev) => ({ ...prev, tab: 2 }))}
						className="md:text-base text-sm"
					>
						Thẻ tag ẩn
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
				pageIndex={searchObject.pageIndex}
				pageSize={searchObject.pageSize}
				pageCount={response.pageCount}
				totalElement={response.totalElement}
				handleChangePageSize={handleChangePageSize}
				dataPageSize={[1, 3, 5, 10]}
			/>
			{!!openHiddenTag && (
				<DialogConfirm
					open={!!openHiddenTag}
					title="Xác nhận ẩn thẻ tag"
					handleClose={() => setOpenHiddenTag(false)}
					handleSubmit={() => handleHiddenCate(openHiddenTag)}
					content="Bạn có chắc muốn ẩn thẻ tag này?"
					labelConfirm="Ẩn"
				/>
			)}
			{!!openUnhiddenTag && (
				<DialogConfirm
					open={!!openUnhiddenTag}
					title="Xác nhận bỏ ẩn thẻ tag"
					handleClose={() => setopenUnhiddenTag(false)}
					handleSubmit={() => handleUnhiddenCate(openUnhiddenTag)}
					content="Bạn có chắc muốn bỏ ẩn thẻ tag này?"
					labelConfirm="Bỏ ẩn"
				/>
			)}
			{!!openId && (
				<TagAdd
					open={openId}
					title="Cập nhật"
					handleClose={() => setOpenId(false)}
					handlePaging={() => handleTags()}
				/>
			)}
		</div>
	);
};

export default TagIndex;
