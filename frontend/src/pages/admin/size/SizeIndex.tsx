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
import { useDebounceCallback } from "usehooks-ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { hiddenListSize, hiddenSize, unhiddenListSize, unhiddenSize } from "@/service/size-admin";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import DialogConfirm from "@/components/common/DialogConfirm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SizeIndex = () => {
	interface IData {
		_id: string;
		name: string;
		toHeight: number;
		fromHeight: number;
		toWeight: number;
		fromWeight: number;
		createdAt: string;
		updatedAt: string;
		deleted: boolean;
	}
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // xử lí selected
  const [listRowSeleted, setListRowSelected] = useState<IData[]>([]);
  const [openHiddenIdSize, setOpenHiddenIdSize] = useState<string | boolean>(false)
  const [openUnHiddenIdSize, setOpenUnHiddenIdSize] = useState<string | boolean>(false);
  const [openHiddenManyIdSize, setOpenHiddenManyIdSize] = useState<string | boolean>(false);
  const [openUnHiddenManyIdSize, setOpenUnHiddenManyIdSize] = useState<string | boolean>(false);
  const listIdSize = listRowSeleted.map((size) => {
    return size._id;
  })
	const [data, setData] = useState<IData[]>([]);
	const [openId, setOpenId] = useState<string | boolean>(false);
	const [searchObject, setSearchObject] = useState<SearchObjectType>({
		pageIndex: 1,
		pageSize: 5,
    keyword: "",
    height: 0,
    weight: 0,
    tab:1
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
			const { data } = await instance.post(`/size/paging`, searchObject);
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
	const debounced = useDebounceCallback((inputValue: string) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
      keyword: inputValue,
		}));
  }, 300);
  const searchWeight = useDebounceCallback((inputValue: number) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
			weight: inputValue,
		}));
  }, 300);
  const searchHeight = useDebounceCallback((inputValue: number) => {
		setSearchObject((prev) => ({
			...prev,
			pageIndex: 1,
			height: inputValue,
		}));
  }, 300);
  const handleHiddenSize = async (id: string | boolean) => {
		try {
			const { data } = await hiddenSize(id);
			setOpenHiddenIdSize(false);
			handleSize();
			toast.success("Đã ẩn size thành công");
		} catch (error) {
			toast.error("Ẩn size thất bại");
		}
	};

	const handleUnhiddenSize = async (id: string | boolean) => {
		try {
			const { data } = await unhiddenSize(id);
			setOpenUnHiddenIdSize(false);
			handleSize();
			toast.success("Bỏ ẩn size thành công");
		} catch (error) {
			toast.error("Bỏ ẩn size thất bại");
		}
  };
  const handleHiddenManySize = async (listId: any) => {
		try {
			const { data } = await hiddenListSize(listId);
			setOpenHiddenManyIdSize(false);
			handleSize();
			toast.success("Đã ẩn mục size thành công");
		} catch (error) {
			toast.error("Ẩn mục size thất bại");
		}
	};

	const handleUnhiddenManySize = async (listId: any) => {
		try {
			const { data } = await unhiddenListSize(listId);
			setOpenUnHiddenManyIdSize(false);
			handleSize();
			toast.success("Bỏ ẩn mục size thành công");
		} catch (error) {
			toast.error("Bỏ ẩn mục size thất bại");
		}
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
			accessorKey: "fromHeight",
			header: "Chiều cao nhỏ",
		},
		{
			accessorKey: "toHeight",
			header: "Chiều cao lớn",
		},
		{
			accessorKey: "fromWeight",
			header: "Cân nặng bé",
		},
		{
			accessorKey: "toWeight",
			header: "Cân nặng lớn",
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
        console.log(row.original);
        
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
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full cursor-pointer"
							>
								Sửa size
							</Button>
							{row?.original?.deleted ? (
								<DropdownMenuItem
									className="text-green-400 text-center cursor-pointer"
									onClick={() => setOpenUnHiddenIdSize(row?.original?._id)}
								>
									Bỏ ẩn
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									className="text-red-400 text-center cursor-pointer"
									onClick={() => setOpenHiddenIdSize(row?.original?._id)}
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
				<h4 className="font-medium text-xl">Danh sách Size</h4>
				<div className="flex justify-between">
					<Input
						placeholder="Tìm kiếm người dùng"
						className="w-[40%] md:text-base text-xs"
						onChange={(e) => debounced(e.target.value)}
					/>
					<div className="flex items-center gap-4 pr-5">
						<Button
							onClick={() => setOpenId(true)}
							className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full border"
						>
							Thêm size
						</Button>
						<Popover>
							<PopoverTrigger asChild>
								<div className="p-2 rounded-full hover:bg-[#e9e9e9]">
									<IoFilter size={20} className="cursor-pointer" />
								</div>
							</PopoverTrigger>
							<PopoverContent className="w-70 mr-8">
								<div className="grid gap-4">
									<div className="space-y-2">
										<h4 className="font-medium leading-none">Tìm kiếm</h4>
									</div>
									<div className="grid gap-2">
										<div className="grid grid-cols-3 items-center gap-4">
											<Label htmlFor="weight">Chiều cao</Label>
											<Input
												id="height"
												defaultValue="0"
												className="col-span-2 h-8"
												onChange={(e) => searchHeight(+e.target.value)}
											/>
										</div>
										<div className="grid grid-cols-3 items-center gap-4">
											<Label htmlFor="height">Cân nặng</Label>
											<Input
												id="weight"
												defaultValue="0"
												className="col-span-2 h-8"
												onChange={(e) => searchWeight(+e.target.value)}
											/>
										</div>
									</div>
								</div>
							</PopoverContent>
						</Popover>
						{listIdSize.length !== 0 && searchObject.tab === 1 ? (
							<Button
								onClick={() => setOpenHiddenManyIdSize(true)}
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full"
							>
								Ẩn nhiều size
							</Button>
						) : (
							""
						)}
						{listIdSize.length !== 0 && searchObject.tab === 2 ? (
							<Button
								onClick={() => setOpenUnHiddenManyIdSize(true)}
								className="bg-white text-[#7f7f7f] hover:bg-[#eeeeee] w-full"
							>
								Bỏ Ẩn nhiều size
							</Button>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			<Tabs value={`${searchObject.tab}`} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="1"
						onClick={() => {
							setListRowSelected([]);
							setRowSelection({});
							setSearchObject((prev) => ({ ...prev, tab: 1 }));
						}}
						className="md:text-base text-sm"
					>
						Size
					</TabsTrigger>
					<TabsTrigger
						value="2"
						onClick={() => {
							setListRowSelected([]);
							setRowSelection({});
							setSearchObject((prev) => ({ ...prev, tab: 2 }));
						}}
						className="md:text-base text-sm"
					>
						Size ẩn
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
			{!!openId && (
				<SizeAddandUpdate
					open={openId}
					title="Cập nhật"
					handleClose={() => setOpenId(false)}
					handlePaging={() => handleSize()}
				/>
			)}
			{!!openHiddenIdSize && (
				<DialogConfirm
					open={!!openHiddenIdSize}
					title="Xác nhận ẩn size"
					handleClose={() => setOpenHiddenIdSize(false)}
					handleSubmit={() => handleHiddenSize(openHiddenIdSize)}
					content="Bạn có chắc muốn ẩn size này?"
					labelConfirm="Ẩn"
				/>
			)}
			{!!openUnHiddenIdSize && (
				<DialogConfirm
					open={!!openUnHiddenIdSize}
					title="Xác nhận ẩn size"
					handleClose={() => setOpenUnHiddenIdSize(false)}
					handleSubmit={() => handleHiddenSize(openUnHiddenIdSize)}
					content="Bạn có chắc muốn ẩn size này?"
					labelConfirm="Ẩn"
				/>
			)}
			{!!openUnHiddenManyIdSize && (
				<DialogConfirm
					open={!!openUnHiddenManyIdSize}
					title="Xác nhận bỏ ẩn mục size"
					handleClose={() => setOpenUnHiddenManyIdSize(false)}
					handleSubmit={() => handleUnhiddenManySize(listIdSize)}
					content="Bạn có chắc muốn bỏ ẩn mục size này?"
					labelConfirm="Bỏ ẩn"
				/>
			)}
			{!!openHiddenManyIdSize && (
				<DialogConfirm
					open={!!openHiddenManyIdSize}
					title="Xác nhận ẩn mục size"
					handleClose={() => setOpenHiddenManyIdSize(false)}
					handleSubmit={() => handleHiddenManySize(listIdSize)}
					content="Bạn có chắc muốn ẩn mục size này?"
					labelConfirm="Ẩn"
				/>
			)}
		</div>
	);
};

export default SizeIndex;
